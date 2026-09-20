# Mercadinho Pro — main.md

## Visão

O **Mercadinho Pro** é uma plataforma de automação comercial e ponto de venda (PDV) de alta performance e simplicidade operacional, desenvolvida em **Google Apps Script** e **Google Sheets** com interface web moderna (**UI+**). Ela permite que pequenos e médios estabelecimentos comerciais gerenciem estoque, realizem vendas com extrema agilidade, emitam cupons de venda em impressoras térmicas e acompanhem o desempenho financeiro através de um dashboard em tempo real, sem necessidade de servidores pagos ou instalações complexas.

## Problema

Pequenos mercadinhos, mercearias e comércios de bairro enfrentam dificuldades com sistemas de PDV tradicionais pesados, caros, que exigem licenças mensais e computadores dedicados de alta performance. Planilhas manuais geram descontrole de estoque, filas no caixa e falta de clareza sobre o faturamento real diário.

## Usuários Principais

1. **Operador de Caixa:** Necessita de agilidade máxima para registrar produtos via leitor de código de barras ou busca rápida, calcular troco, receber pagamentos (PIX, Dinheiro, Cartão) e imprimir o cupom do cliente.
2. **Gerente / Proprietário:** Necessita cadastrar produtos e preços, controlar estoque mínimo para reposição, consultar histórico de vendas e analisar métricas financeiras no dashboard.

## Métricas de Sucesso

- **Tempo de Registro por Venda:** $< 15$ segundos para vendas com até 5 itens.
- **Disponibilidade:** 99,9% garantida pela infraestrutura Google Cloud / Apps Script.
- **Confiabilidade de Estoque:** 100% de integridade nas baixas atômicas com `LockService`.
- **Aderência à Impressão:** Compatibilidade nativa com impressoras térmicas de 80mm e 58mm via diálogo padrão de impressão do Chrome.

## Escopo da Plataforma

- **PDV (Ponto de Venda Ágil):** Leitura de código de barras, busca preditiva por nome, atalhos de teclado (`F2`, `F4`, `Enter`), controle de quantidade e desconto.
- **Fechamento e Pagamento:** Dinheiro (com cálculo automático de troco), PIX (com chave/QR Code), Cartão de Débito e Cartão de Crédito.
- **Emissor de Cupom:** Visualização e impressão térmica formatada (estilo cupom fiscal) e opção de cópia para WhatsApp.
- **Gestão de Estoque:** Cadastro completo (código, nome, categoria, unidade, custo, venda, estoque atual e mínimo), edição e ajuste de saldo.
- **Dashboard & KPIs:** Faturamento do dia, quantidade de vendas, ticket médio, gráfico de vendas por período, produtos mais vendidos e alertas de estoque crítico.
- **Histórico de Vendas:** Consulta detalhada de vendas passadas com visualização dos itens e reimpressão de cupom.

## Não-Escopo Inicial

- Emissão de Nota Fiscal Eletrônica (NFC-e / NF-e via SEFAZ) com certificado digital A1/A3 (o sistema emite cupom de venda / recibo comercial formatado).
- Gateway de pagamento integrado com maquininha TEF física (o registro do pagamento é gerencial).

## Restrições e Premissas

- Executado via Google Apps Script (HTML Service) diretamente no navegador Chrome do usuário já autenticado.
- Base de dados armazenada em Google Sheets estruturada em 5 abas relacionais.
