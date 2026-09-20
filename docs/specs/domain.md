# Mercadinho Pro — domain.md

## Linguagem Ubíqua

- **Produto:** Item comercializável com código de barras, nome, categoria, preço de custo, preço de venda e estoque.
- **Venda (Cupom de Venda):** Transação comercial fechada contendo múltiplos itens de venda, forma de pagamento, descontos e total.
- **Item de Venda:** Associação entre uma venda e um produto com quantidade, preço unitário praticado e subtotal.
- **Movimentação de Estoque:** Registro de auditoria temporal de entrada, saída por venda ou ajuste de inventário.
- **Estoque Mínimo:** Limite inferior de segurança para disparo de alerta visual de reposição no dashboard.
- **Forma de Pagamento:** Modalidade de liquidação financeira (`DINHEIRO`, `PIX`, `DEBITO`, `CREDITO`).

## Entidades e Modelos de Domínio

### 1. Produto (`Product`)
- `id`: String (ex: `PRD-1724263000-123`)
- `codigoBarras`: String (EAN-13, EAN-8 ou código numérico curto)
- `nome`: String (ex: "Arroz Tipo 1 5kg")
- `categoria`: String (ex: "Mercearia", "Bebidas", "Limpeza", "Laticínios", "Hortifruti", "Padaria")
- `precoCusto`: Number (ex: 18.50)
- `precoVenda`: Number (ex: 26.90)
- `estoqueAtual`: Number (ex: 45)
- `estoqueMinimo`: Number (ex: 10)
- `unidade`: String (`UN`, `KG`, `LT`, `PCT`, `CX`)
- `ativo`: Boolean (`true` / `false`)
- `atualizadoEm`: ISO Date String

### 2. Venda (`Sale`)
- `idVenda`: String (ex: `VND-20260821-0001`)
- `dataHora`: ISO Date String
- `subtotal`: Number
- `desconto`: Number
- `total`: Number
- `formaPagamento`: String (`DINHEIRO`, `PIX`, `DEBITO`, `CREDITO`, `MISTO`)
- `valorRecebido`: Number
- `troco`: Number
- `status`: String (`CONCLUIDA`, `CANCELADA`)
- `operador`: String (e-mail da conta Google ativa)
- `itens`: Array de `SaleItem`

### 3. Item de Venda (`SaleItem`)
- `idItem`: String (ex: `ITM-001`)
- `idVenda`: String
- `idProduto`: String
- `nomeProduto`: String
- `quantidade`: Number
- `precoUnitario`: Number
- `totalItem`: Number (`quantidade * precoUnitario`)

### 4. Movimentação de Estoque (`StockMovement`)
- `idMov`: String
- `dataHora`: ISO Date String
- `idProduto`: String
- `tipo`: String (`ENTRADA_COMPRA`, `SAIDA_VENDA`, `AJUSTE_PERDA`, `AJUSTE_INVENTARIO`)
- `quantidade`: Number
- `saldoAnterior`: Number
- `saldoNovo`: Number
- `referencia`: String (`idVenda` ou observação manual)

## Invariantes de Negócio

1. Não é permitida a venda com valor total inferior a R\$ 0,00.
2. No pagamento em dinheiro, o `valorRecebido` deve ser maior ou igual ao `total` da venda; o `troco` deve ser calculado exatamente como `valorRecebido - total`.
3. Ao concluir uma venda, o estoque de cada produto vendido deve ser decrementado atomicamente na quantidade correspondente e uma movimentação do tipo `SAIDA_VENDA` deve ser registrada.
4. Códigos de barras não podem ser duplicados entre produtos ativos.
