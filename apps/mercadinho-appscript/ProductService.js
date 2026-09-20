/**
 * Mercadinho Pro - ProductService.js
 * Gerenciamento de Produtos, Código de Barras e Ajustes de Estoque.
 */

var ProductService = (function () {
  /**
   * Retorna todos os produtos cadastrados (ativos por padrão)
   */
  function getAllProducts(includeInactive) {
    var sheet = SheetDB.getSheet(SheetDB.TABS.PRODUTOS);
    var products = SheetDB.sheetToObjects(sheet, SheetDB.HEADERS.PRODUTOS);

    if (!includeInactive) {
      products = products.filter(function (p) {
        return p.ativo === true || p.ativo === 'TRUE' || p.ativo === 'true';
      });
    }

    return products;
  }

  /**
   * Busca produto por código de barras exato ou ID
   */
  function findByBarcodeOrId(query) {
    if (!query) return null;
    var cleanQuery = String(query).trim().toLowerCase();
    var products = getAllProducts(false);

    for (var i = 0; i < products.length; i++) {
      var p = products[i];
      if (String(p.codigoBarras).toLowerCase() === cleanQuery || String(p.id).toLowerCase() === cleanQuery) {
        return p;
      }
    }
    return null;
  }

  /**
   * Salva ou atualiza um produto no estoque
   */
  function saveProduct(productData) {
    if (!productData || !productData.nome) {
      throw new Error('O nome do produto é obrigatório.');
    }

    return SheetDB.withLock(function () {
      var sheet = SheetDB.getSheet(SheetDB.TABS.PRODUTOS);
      var lastRow = sheet.getLastRow();
      var isUpdate = false;
      var targetRow = -1;
      var existingId = productData.id;

      if (existingId && lastRow > 1) {
        var idCol = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
        for (var i = 0; i < idCol.length; i++) {
          if (String(idCol[i][0]) === String(existingId)) {
            targetRow = i + 2;
            isUpdate = true;
            break;
          }
        }
      }

      var id = isUpdate ? existingId : ('PRD-' + new Date().getTime());
      var codigoBarras = productData.codigoBarras ? String(productData.codigoBarras).trim() : '';
      var nome = String(productData.nome).trim();
      var categoria = productData.categoria ? String(productData.categoria).trim() : 'Geral';
      var precoCusto = parseFloat(productData.precoCusto) || 0;
      var precoVenda = parseFloat(productData.precoVenda) || 0;
      var estoqueAtual = parseFloat(productData.estoqueAtual) || 0;
      var estoqueMinimo = parseFloat(productData.estoqueMinimo) || 0;
      var unidade = productData.unidade ? String(productData.unidade).trim().toUpperCase() : 'UN';
      var ativo = productData.ativo !== false;
      var atualizadoEm = new Date().toISOString();

      var rowData = [
        id,
        SheetDB.sanitizeValue(codigoBarras),
        SheetDB.sanitizeValue(nome),
        SheetDB.sanitizeValue(categoria),
        precoCusto,
        precoVenda,
        estoqueAtual,
        estoqueMinimo,
        unidade,
        ativo,
        atualizadoEm
      ];

      if (isUpdate) {
        sheet.getRange(targetRow, 1, 1, SheetDB.HEADERS.PRODUTOS.length).setValues([rowData]);
      } else {
        sheet.appendRow(rowData);
        // Registra movimentação de saldo inicial se houver estoque
        if (estoqueAtual > 0) {
          logStockMovement(id, 'ENTRADA_INICIAL', estoqueAtual, 0, estoqueAtual, 'Cadastro Inicial');
        }
      }

      return {
        id: id,
        codigoBarras: codigoBarras,
        nome: nome,
        categoria: categoria,
        precoCusto: precoCusto,
        precoVenda: precoVenda,
        estoqueAtual: estoqueAtual,
        estoqueMinimo: estoqueMinimo,
        unidade: unidade,
        ativo: ativo,
        atualizadoEm: atualizadoEm
      };
    });
  }

  /**
   * Ajuste manual de saldo de estoque com rastreabilidade
   */
  function adjustStock(idProduto, quantidadeDelta, tipo, referencia) {
    return SheetDB.withLock(function () {
      var sheet = SheetDB.getSheet(SheetDB.TABS.PRODUTOS);
      var lastRow = sheet.getLastRow();
      if (lastRow <= 1) throw new Error('Nenhum produto cadastrado.');

      var data = sheet.getRange(2, 1, lastRow - 1, SheetDB.HEADERS.PRODUTOS.length).getValues();
      var targetRowIndex = -1;
      var currentProduct = null;

      for (var i = 0; i < data.length; i++) {
        if (String(data[i][0]) === String(idProduto)) {
          targetRowIndex = i + 2;
          currentProduct = data[i];
          break;
        }
      }

      if (targetRowIndex === -1) {
        throw new Error('Produto não encontrado: ' + idProduto);
      }

      var saldoAnterior = parseFloat(currentProduct[6]) || 0;
      var delta = parseFloat(quantidadeDelta) || 0;
      var saldoNovo = saldoAnterior + delta;

      if (saldoNovo < 0) {
        saldoNovo = 0; // Evita estoque negativo por padrão
      }

      // Atualiza coluna de estoque (G = coluna 7) e data de atualização (K = coluna 11)
      sheet.getRange(targetRowIndex, 7).setValue(saldoNovo);
      sheet.getRange(targetRowIndex, 11).setValue(new Date().toISOString());

      // Registra na aba de movimentações
      logStockMovement(idProduto, tipo || 'AJUSTE_MANUAL', delta, saldoAnterior, saldoNovo, referencia || 'Ajuste de Estoque');

      return { idProduto: idProduto, saldoAnterior: saldoAnterior, saldoNovo: saldoNovo };
    });
  }

  /**
   * Exclusão lógica (desativação) do produto
   */
  function deleteProduct(idProduto) {
    return SheetDB.withLock(function () {
      var sheet = SheetDB.getSheet(SheetDB.TABS.PRODUTOS);
      var lastRow = sheet.getLastRow();
      if (lastRow <= 1) return { success: false, message: 'Produto não encontrado.' };

      var idCol = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      for (var i = 0; i < idCol.length; i++) {
        if (String(idCol[i][0]) === String(idProduto)) {
          var row = i + 2;
          // Seta coluna J (ativo = 10) como false
          sheet.getRange(row, 10).setValue(false);
          sheet.getRange(row, 11).setValue(new Date().toISOString());
          return { success: true, message: 'Produto inativado com sucesso.' };
        }
      }
      return { success: false, message: 'Produto não encontrado.' };
    });
  }

  /**
   * Auxiliar interno para gravar na aba MOVIMENTACOES
   */
  function logStockMovement(idProduto, tipo, quantidade, saldoAnterior, saldoNovo, referencia) {
    var sheetMov = SheetDB.getSheet(SheetDB.TABS.MOVIMENTACOES);
    var idMov = 'MOV-' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
    var row = [
      idMov,
      new Date().toISOString(),
      idProduto,
      tipo,
      quantidade,
      saldoAnterior,
      saldoNovo,
      SheetDB.sanitizeValue(referencia || '')
    ];
    sheetMov.appendRow(row);
  }

  return {
    getAllProducts: getAllProducts,
    findByBarcodeOrId: findByBarcodeOrId,
    saveProduct: saveProduct,
    adjustStock: adjustStock,
    deleteProduct: deleteProduct,
    logStockMovement: logStockMovement
  };
})();
