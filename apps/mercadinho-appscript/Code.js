/**
 * Mercadinho Pro - Code.js
 * Ponto de Entrada do Google Apps Script (Web App Controller e Roteamento de APIs).
 */

/**
 * Renderiza a Single Page Application (SPA)
 */
function doGet(e) {
  // Garante auto-setup do banco de dados na primeira execução
  try {
    SheetDB.initDatabase();
  } catch (err) {
    Logger.log('Aviso na inicialização do banco: ' + err.message);
  }

  var template = HtmlService.createTemplateFromFile('Index');
  return template
    .evaluate()
    .setTitle('Mercadinho Pro — PDV, Estoque & Cupom')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Utilitário para inclusão modular de arquivos HTML parciais
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/* ==========================================================================
   ENDPOINTS REMOTOS (GOOGLE.SCRIPT.RUN)
   ========================================================================== */

/**
 * Retorna os dados iniciais consolidados (Produtos + Configurações + Email)
 */
function apiGetInitialData() {
  try {
    var products = ProductService.getAllProducts(false);
    var sheetConfig = SheetDB.getSheet(SheetDB.TABS.CONFIG);
    var configRows = SheetDB.sheetToObjects(sheetConfig, SheetDB.HEADERS.CONFIG);

    var configMap = {};
    configRows.forEach(function (c) {
      configMap[c.chave] = c.valor;
    });

    var userEmail = Session.getActiveUser().getEmail() || 'Operador Conectado';

    return {
      success: true,
      data: {
        products: products,
        config: configMap,
        userEmail: userEmail
      }
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Salva ou atualiza um produto
 */
function apiSaveProduct(productData) {
  try {
    var saved = ProductService.saveProduct(productData);
    return { success: true, data: saved };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Ajusta o estoque manualmente
 */
function apiAdjustStock(idProduto, quantidadeDelta, tipo, referencia) {
  try {
    var result = ProductService.adjustStock(idProduto, quantidadeDelta, tipo, referencia);
    return { success: true, data: result };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Desativa um produto do catálogo
 */
function apiDeleteProduct(idProduto) {
  try {
    var result = ProductService.deleteProduct(idProduto);
    return result;
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Processa a venda no PDV e emite dados do cupom
 */
function apiProcessSale(payload) {
  try {
    var saleResult = SaleService.processSale(payload);
    return { success: true, data: saleResult };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Retorna as métricas do dashboard
 */
function apiGetDashboardMetrics() {
  try {
    var metrics = DashboardService.getDashboardMetrics();
    return { success: true, data: metrics };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Retorna histórico recente de vendas
 */
function apiGetSalesHistory(limit) {
  try {
    var history = SaleService.getSalesHistory(limit || 50);
    return { success: true, data: history };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Salva as configurações da loja
 */
function apiSaveConfig(configObj) {
  try {
    return SheetDB.withLock(function () {
      var sheet = SheetDB.getSheet(SheetDB.TABS.CONFIG);
      var lastRow = sheet.getLastRow();
      var data = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, 3).getValues() : [];

      var keys = Object.keys(configObj);
      keys.forEach(function (key) {
        var found = false;
        for (var i = 0; i < data.length; i++) {
          if (String(data[i][0]) === String(key)) {
            sheet.getRange(i + 2, 2).setValue(SheetDB.sanitizeValue(configObj[key]));
            found = true;
            break;
          }
        }
        if (!found) {
          sheet.appendRow([key, SheetDB.sanitizeValue(configObj[key]), 'Configuração']);
        }
      });

      return { success: true, message: 'Configurações salvas com sucesso.' };
    });
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Força re-inicialização do banco
 */
function apiInitDatabase() {
  try {
    var res = SheetDB.initDatabase();
    return res;
  } catch (err) {
    return { success: false, error: err.message };
  }
}
