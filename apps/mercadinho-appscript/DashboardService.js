/**
 * Mercadinho Pro - DashboardService.js
 * Consolidação de Métricas, Estatísticas de Vendas e Alertas de Estoque.
 */

var DashboardService = (function () {
  /**
   * Consolida todos os dados analíticos para o Dashboard
   */
  function getDashboardMetrics() {
    var sheetVendas = SheetDB.getSheet(SheetDB.TABS.VENDAS);
    var sheetItens = SheetDB.getSheet(SheetDB.TABS.ITENS_VENDA);
    var sheetProdutos = SheetDB.getSheet(SheetDB.TABS.PRODUTOS);

    var vendas = SheetDB.sheetToObjects(sheetVendas, SheetDB.HEADERS.VENDAS);
    var itens = SheetDB.sheetToObjects(sheetItens, SheetDB.HEADERS.ITENS_VENDA);
    var produtos = SheetDB.sheetToObjects(sheetProdutos, SheetDB.HEADERS.PRODUTOS);

    var hoje = new Date();
    var hojeYMD = hoje.getFullYear() + '-' + String(hoje.getMonth() + 1).padStart(2, '0') + '-' + String(hoje.getDate()).padStart(2, '0');

    // 1. Métricas do dia de hoje
    var faturamentoHoje = 0;
    var vendasHojeQtd = 0;
    var vendasPorFormaPagto = { DINHEIRO: 0, PIX: 0, DEBITO: 0, CREDITO: 0, OUTROS: 0 };

    vendas.forEach(function (v) {
      if (v.status !== 'CANCELADA') {
        var dataVenda = new Date(v.dataHora);
        var vendaYMD = dataVenda.getFullYear() + '-' + String(dataVenda.getMonth() + 1).padStart(2, '0') + '-' + String(dataVenda.getDate()).padStart(2, '0');
        var valorTotal = parseFloat(v.total) || 0;

        if (vendaYMD === hojeYMD) {
          faturamentoHoje += valorTotal;
          vendasHojeQtd += 1;
        }

        // Distribuição geral de pagamento
        var forma = String(v.formaPagamento || 'OUTROS').toUpperCase();
        if (vendasPorFormaPagto[forma] !== undefined) {
          vendasPorFormaPagto[forma] += valorTotal;
        } else {
          vendasPorFormaPagto.OUTROS += valorTotal;
        }
      }
    });

    var ticketMedioHoje = vendasHojeQtd > 0 ? (faturamentoHoje / vendasHojeQtd) : 0;

    // 2. Alertas de estoque crítico
    var produtosEstoqueCritico = [];
    produtos.forEach(function (p) {
      var ativo = p.ativo === true || p.ativo === 'TRUE' || p.ativo === 'true';
      if (ativo) {
        var atual = parseFloat(p.estoqueAtual) || 0;
        var minimo = parseFloat(p.estoqueMinimo) || 0;
        if (atual <= minimo) {
          produtosEstoqueCritico.push({
            id: p.id,
            codigoBarras: p.codigoBarras,
            nome: p.nome,
            categoria: p.categoria,
            estoqueAtual: atual,
            estoqueMinimo: minimo,
            unidade: p.unidade,
            precoVenda: parseFloat(p.precoVenda) || 0
          });
        }
      }
    });

    // Ordena produtos críticos pelo menor estoque relativo
    produtosEstoqueCritico.sort(function (a, b) {
      return a.estoqueAtual - b.estoqueAtual;
    });

    // 3. Top 5 produtos mais vendidos
    var rankingItens = {};
    itens.forEach(function (it) {
      var id = it.idProduto || it.nomeProduto;
      if (!rankingItens[id]) {
        rankingItens[id] = {
          nome: it.nomeProduto,
          quantidade: 0,
          faturamento: 0
        };
      }
      rankingItens[id].quantidade += (parseFloat(it.quantidade) || 0);
      rankingItens[id].faturamento += (parseFloat(it.totalItem) || 0);
    });

    var topProdutos = Object.keys(rankingItens).map(function (k) {
      return rankingItens[k];
    });

    topProdutos.sort(function (a, b) {
      return b.quantidade - a.quantidade;
    });
    topProdutos = topProdutos.slice(0, 5);

    // 4. Faturamento dos últimos 7 dias para o gráfico
    var ultimos7Dias = [];
    for (var d = 6; d >= 0; d--) {
      var diaRef = new Date();
      diaRef.setDate(diaRef.getDate() - d);
      var diaYMD = diaRef.getFullYear() + '-' + String(diaRef.getMonth() + 1).padStart(2, '0') + '-' + String(diaRef.getDate()).padStart(2, '0');
      var labelDia = String(diaRef.getDate()).padStart(2, '0') + '/' + String(diaRef.getMonth() + 1).padStart(2, '0');

      var faturamentoDia = 0;
      vendas.forEach(function (v) {
        if (v.status !== 'CANCELADA') {
          var dt = new Date(v.dataHora);
          var vYMD = dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0');
          if (vYMD === diaYMD) {
            faturamentoDia += (parseFloat(v.total) || 0);
          }
        }
      });

      ultimos7Dias.push({
        dataLabel: labelDia,
        total: faturamentoDia
      });
    }

    return {
      faturamentoHoje: faturamentoHoje,
      vendasHojeQtd: vendasHojeQtd,
      ticketMedioHoje: ticketMedioHoje,
      itensEstoqueCriticoQtd: produtosEstoqueCritico.length,
      produtosEstoqueCritico: produtosEstoqueCritico,
      topProdutos: topProdutos,
      ultimos7Dias: ultimos7Dias,
      vendasPorFormaPagto: vendasPorFormaPagto
    };
  }

  return {
    getDashboardMetrics: getDashboardMetrics
  };
})();
