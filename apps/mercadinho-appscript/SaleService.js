/**
 * Mercadinho Pro - SaleService.js
 * Processamento Atômico de Vendas, Baixa de Estoque e Emissão de Cupom.
 */

var SaleService = (function () {
  /**
   * Processa uma venda completa no PDV atomicamente
   */
  function processSale(payload) {
    if (!payload || !payload.itens || payload.itens.length === 0) {
      throw new Error('A venda não possui itens.');
    }

    return SheetDB.withLock(function () {
      var sheetVendas = SheetDB.getSheet(SheetDB.TABS.VENDAS);
      var sheetItens = SheetDB.getSheet(SheetDB.TABS.ITENS_VENDA);
      var sheetProdutos = SheetDB.getSheet(SheetDB.TABS.PRODUTOS);

      var dataHora = new Date();
      var isoDate = dataHora.toISOString();
      
      // Gera ID de venda no formato VND-YYYYMMDD-XXXX
      var yyyy = dataHora.getFullYear();
      var mm = String(dataHora.getMonth() + 1).padStart(2, '0');
      var dd = String(dataHora.getDate()).padStart(2, '0');
      var randSuffix = Math.floor(1000 + Math.random() * 9000);
      var idVenda = 'VND-' + yyyy + mm + dd + '-' + randSuffix;

      var subtotal = parseFloat(payload.subtotal) || 0;
      var desconto = parseFloat(payload.desconto) || 0;
      var total = parseFloat(payload.total) || (subtotal - desconto);
      if (total < 0) total = 0;

      var formaPagamento = payload.formaPagamento ? String(payload.formaPagamento).toUpperCase() : 'DINHEIRO';
      var valorRecebido = parseFloat(payload.valorRecebido) || total;
      var troco = parseFloat(payload.troco) || 0;
      var operador = Session.getActiveUser().getEmail() || 'Operador Caixa';

      // 1. Grava o cabeçalho da venda na aba VENDAS
      var vendaRow = [
        idVenda,
        isoDate,
        subtotal,
        desconto,
        total,
        formaPagamento,
        valorRecebido,
        troco,
        'CONCLUIDA',
        operador
      ];
      sheetVendas.appendRow(vendaRow);

      // 2. Carrega todos os produtos para atualizar estoque em lote
      var prodLastRow = sheetProdutos.getLastRow();
      var prodData = prodLastRow > 1 ? sheetProdutos.getRange(2, 1, prodLastRow - 1, SheetDB.HEADERS.PRODUTOS.length).getValues() : [];
      var prodMap = {};
      for (var p = 0; p < prodData.length; p++) {
        prodMap[String(prodData[p][0])] = {
          rowIndex: p + 2,
          data: prodData[p]
        };
      }

      // 3. Processa cada item e decrementa estoque
      var itensRows = [];
      var processedItems = [];

      for (var i = 0; i < payload.itens.length; i++) {
        var item = payload.itens[i];
        var idItem = 'ITM-' + idVenda.replace('VND-', '') + '-' + (i + 1);
        var idProduto = String(item.idProduto || '');
        var nomeProduto = String(item.nomeProduto || 'Produto Diverso');
        var qtd = parseFloat(item.quantidade) || 1;
        var unitario = parseFloat(item.precoUnitario) || 0;
        var totalItem = parseFloat(item.totalItem) || (qtd * unitario);

        itensRows.push([
          idItem,
          idVenda,
          idProduto,
          SheetDB.sanitizeValue(nomeProduto),
          qtd,
          unitario,
          totalItem
        ]);

        processedItems.push({
          idItem: idItem,
          idProduto: idProduto,
          nomeProduto: nomeProduto,
          quantidade: qtd,
          precoUnitario: unitario,
          totalItem: totalItem
        });

        // Atualiza estoque se o produto estiver cadastrado
        if (idProduto && prodMap[idProduto]) {
          var prodEntry = prodMap[idProduto];
          var saldoAnterior = parseFloat(prodEntry.data[6]) || 0;
          var saldoNovo = Math.max(0, saldoAnterior - qtd);

          // Atualiza valor em memória e na planilha
          prodEntry.data[6] = saldoNovo;
          sheetProdutos.getRange(prodEntry.rowIndex, 7).setValue(saldoNovo);
          sheetProdutos.getRange(prodEntry.rowIndex, 11).setValue(isoDate);

          // Registra movimentação de saída
          ProductService.logStockMovement(idProduto, 'SAIDA_VENDA', -qtd, saldoAnterior, saldoNovo, idVenda);
        }
      }

      // Grava todos os itens de uma vez na aba ITENS_VENDA
      if (itensRows.length > 0) {
        sheetItens.getRange(sheetItens.getLastRow() + 1, 1, itensRows.length, SheetDB.HEADERS.ITENS_VENDA.length).setValues(itensRows);
      }

      // Retorna o payload completo para emissão imediata do cupom
      return {
        idVenda: idVenda,
        dataHora: isoDate,
        subtotal: subtotal,
        desconto: desconto,
        total: total,
        formaPagamento: formaPagamento,
        valorRecebido: valorRecebido,
        troco: troco,
        operador: operador,
        itens: processedItems
      };
    }, 15000);
  }

  /**
   * Consulta histórico de vendas com filtros
   */
  function getSalesHistory(limit) {
    var maxLimit = limit || 50;
    var sheetVendas = SheetDB.getSheet(SheetDB.TABS.VENDAS);
    var sheetItens = SheetDB.getSheet(SheetDB.TABS.ITENS_VENDA);

    var vendas = SheetDB.sheetToObjects(sheetVendas, SheetDB.HEADERS.VENDAS);
    var todosItens = SheetDB.sheetToObjects(sheetItens, SheetDB.HEADERS.ITENS_VENDA);

    // Mapeia itens por idVenda
    var itensPorVenda = {};
    todosItens.forEach(function (item) {
      if (!itensPorVenda[item.idVenda]) {
        itensPorVenda[item.idVenda] = [];
      }
      itensPorVenda[item.idVenda].push(item);
    });

    // Ordena vendas da mais recente para a mais antiga e aplica limite
    vendas.reverse();
    var resultado = vendas.slice(0, maxLimit).map(function (v) {
      v.itens = itensPorVenda[v.idVenda] || [];
      return v;
    });

    return resultado;
  }

  return {
    processSale: processSale,
    getSalesHistory: getSalesHistory
  };
})();
