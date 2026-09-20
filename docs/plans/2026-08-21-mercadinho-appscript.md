# Plan — Implementação da Plataforma Mercadinho Pro (Google Apps Script)

- **Data:** 2026-08-21
- **Agentes:** architect · database · backend · frontend · security-reviewer · test-engineer · documentation-writer
- **Objetivo:** Construir uma solução completa de PDV, Estoque, Emissor de Cupom e Dashboard para Mercadinho rodando em Google Apps Script com UI+ moderna.

---

## 1. Arquivos a Criar

| Arquivo | Camada | Responsabilidade |
|---|---|---|
| `apps/mercadinho-appscript/Code.js` | Backend | Roteamento, `doGet`, inclusão de templates e pontes de API |
| `apps/mercadinho-appscript/SheetDB.js` | Database | Inicialização de abas, sanitização de fórmulas e LockService |
| `apps/mercadinho-appscript/ProductService.js` | Backend | Lógica de produtos, busca por código de barras e estoque |
| `apps/mercadinho-appscript/SaleService.js` | Backend | Processamento atômico de vendas e baixa de estoque |
| `apps/mercadinho-appscript/DashboardService.js` | Backend | Métricas financeiras, gráficos e alertas de reposição |
| `apps/mercadinho-appscript/Index.html` | Frontend UI+ | Shell SPA, header, navegação em abas e modais |
| `apps/mercadinho-appscript/Styles.html` | Frontend UI+ | Estilização Tailwind, tema visual, regras de impressão 80mm |
| `apps/mercadinho-appscript/Script.html` | Frontend UI+ | Gestão de estado, atalhos F2/F4, carrinho, toasts e Chart.js |
| `apps/mercadinho-appscript/ReceiptTemplate.html` | Frontend UI+ | Layout do cupom térmico não-fiscal |
| `apps/mercadinho-appscript/appsscript.json` | Config | Manifesto com permissões mínimas do Google Apps Script |

---

## 2. Checklist de Segurança e Qualidade
- [x] Proteção contra injeção de fórmulas no Google Sheets
- [x] Concorrência atômica via `LockService`
- [x] Atalhos de teclado no PDV para operação ultrarrápida
- [x] Impressão direta formatada para bobinas térmicas de 80mm e 58mm
- [x] Tratamento de erros com toasts elegantes sem travar a interface
