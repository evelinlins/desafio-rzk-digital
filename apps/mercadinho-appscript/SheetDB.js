/**
 * Mercadinho Pro - SheetDB.js
 * Adaptador de Banco de Dados para Google Sheets com Auto-Setup,
 * Sanitização contra Formula Injection e Controle de Concorrência.
 */

var SheetDB = (function () {
  var TABS = {
    PRODUTOS: 'PRODUTOS',
    VENDAS: 'VENDAS',
    ITENS_VENDA: 'ITENS_VENDA',
    MOVIMENTACOES: 'MOVIMENTACOES',
    CONFIG: 'CONFIG'
  };

  var HEADERS = {
    PRODUTOS: ['id', 'codigoBarras', 'nome', 'categoria', 'precoCusto', 'precoVenda', 'estoqueAtual', 'estoqueMinimo', 'unidade', 'ativo', 'atualizadoEm'],
    VENDAS: ['idVenda', 'dataHora', 'subtotal', 'desconto', 'total', 'formaPagamento', 'valorRecebido', 'troco', 'status', 'operador'],
    ITENS_VENDA: ['idItem', 'idVenda', 'idProduto', 'nomeProduto', 'quantidade', 'precoUnitario', 'totalItem'],
    MOVIMENTACOES: ['idMov', 'dataHora', 'idProduto', 'tipo', 'quantidade', 'saldoAnterior', 'saldoNovo', 'referencia'],
    CONFIG: ['chave', 'valor', 'descricao']
  };

  /**
   * Obtém a planilha ativa (ou vinculada ao script)
   */
  function getSpreadsheet() {
    try {
      return SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create('Mercadinho Pro - Base de Dados');
    } catch (e) {
      throw new Error('Não foi possível acessar a planilha. Verifique as permissões.');
    }
  }

  /**
   * Obtém ou cria uma aba garantindo os cabeçalhos corretos
   */
  function getSheet(tabName) {
    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
      var headers = HEADERS[tabName];
      if (headers) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        sheet.getRange(1, 1, 1, headers.length)
          .setBackground('#1e293b')
          .setFontColor('#f8fafc')
          .setFontWeight('bold')
          .setHorizontalAlignment('center');
        sheet.setFrozenRows(1);
      }
    }
    return sheet;
  }

  /**
   * Sanitiza valor para prevenir Formula Injection no Google Sheets
   */
  function sanitizeValue(val) {
    if (typeof val === 'string') {
      var firstChar = val.charAt(0);
      if (firstChar === '=' || firstChar === '+' || firstChar === '-' || firstChar === '@' || firstChar === '\t') {
        return "'" + val;
      }
    }
    return val;
  }

  /**
   * Converte array de linhas da planilha para array de objetos tipados
   */
  function sheetToObjects(sheet, headers) {
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) return [];

    var lastCol = headers.length;
    var data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

    return data.map(function (row) {
      var obj = {};
      headers.forEach(function (header, idx) {
        obj[header] = row[idx];
      });
      return obj;
    });
  }

  /**
   * Auto-setup: Inicializa todas as abas e dados padrão se a planilha estiver vazia
   */
  function initDatabase() {
    var ss = getSpreadsheet();

    Object.keys(TABS).forEach(function (tabKey) {
      var tabName = TABS[tabKey];
      var sheet = getSheet(tabName);

      // Se for a aba CONFIG e estiver vazia, popula com configurações padrão
      if (tabName === TABS.CONFIG && sheet.getLastRow() <= 1) {
        var defaultConfig = [
          ['NOME_MERCADINHO', 'Mercadinho Pro', 'Nome fantasia exibido no PDV e no cupom'],
          ['CNPJ_CPF', '12.345.678/0001-90', 'CNPJ ou CPF do estabelecimento'],
          ['ENDERECO', 'Rua do Comércio, 100 - Bairro Centro', 'Endereço completo da loja'],
          ['TELEFONE', '(11) 99999-8888', 'Telefone / WhatsApp para contato'],
          ['CHAVE_PIX', '12345678000190', 'Chave PIX para pagamentos no caixa'],
          ['MENSAGEM_RODAPE', 'Obrigado pela preferência! Volte sempre!', 'Mensagem impressa no rodapé do cupom']
        ];
        sheet.getRange(2, 1, defaultConfig.length, 3).setValues(defaultConfig);
      }

      // Se for a aba PRODUTOS e estiver vazia, popula com produtos de exemplo
      if (tabName === TABS.PRODUTOS && sheet.getLastRow() <= 1) {
        var sampleProducts = [
          ['PRD-001', '7891000100101', 'Arroz Branco Tipo 1 5kg', 'Mercearia', 19.50, 27.90, 45, 10, 'UN', true, new Date().toISOString()],
          ['PRD-002', '7891000100102', 'Feijão Carioca 1kg', 'Mercearia', 5.20, 7.89, 60, 15, 'UN', true, new Date().toISOString()],
          ['PRD-003', '7891000100103', 'Óleo de Soja 900ml', 'Mercearia', 4.10, 6.49, 30, 8, 'UN', true, new Date().toISOString()],
          ['PRD-004', '7891000100104', 'Leite Integral UHT 1L', 'Laticínios', 3.80, 5.29, 80, 20, 'UN', true, new Date().toISOString()],
          ['PRD-005', '7891000100105', 'Café Torrado e Moído 500g', 'Mercearia', 12.00, 17.50, 25, 5, 'UN', true, new Date().toISOString()],
          ['PRD-006', '7891000100106', 'Refrigerante Cola 2L', 'Bebidas', 6.00, 9.99, 40, 10, 'UN', true, new Date().toISOString()],
          ['PRD-007', '7891000100107', 'Detergente Líquido 500ml', 'Limpeza', 1.60, 2.79, 50, 12, 'UN', true, new Date().toISOString()],
          ['PRD-008', '7891000100108', 'Pão Francês KG', 'Padaria', 8.00, 15.90, 15, 5, 'KG', true, new Date().toISOString()],
          ['PRD-009', '7891000100109', 'Queijo Mussarela Fatiado 200g', 'Frios', 6.50, 9.80, 18, 6, 'UN', true, new Date().toISOString()],
          ['PRD-010', '7891000100110', 'Sabonete 90g', 'Higiene', 1.20, 2.49, 35, 10, 'UN', true, new Date().toISOString()]
        ];
        sheet.getRange(2, 1, sampleProducts.length, HEADERS.PRODUTOS.length).setValues(sampleProducts);
      }
    });

    return { success: true, message: 'Banco de dados inicializado com sucesso.' };
  }

  /**
   * Executa operação com Lock exclusivo do script para garantir atomicidade
   */
  function withLock(callback, timeoutMs) {
    var lock = LockService.getScriptLock();
    var timeout = timeoutMs || 10000;
    try {
      lock.waitLock(timeout);
      return callback();
    } catch (err) {
      throw new Error('O sistema está ocupado processando outra operação. Tente novamente em alguns segundos. (' + err.message + ')');
    } finally {
      lock.releaseLock();
    }
  }

  return {
    TABS: TABS,
    HEADERS: HEADERS,
    getSpreadsheet: getSpreadsheet,
    getSheet: getSheet,
    sanitizeValue: sanitizeValue,
    sheetToObjects: sheetToObjects,
    initDatabase: initDatabase,
    withLock: withLock
  };
})();
