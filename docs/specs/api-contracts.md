# Mercadinho Pro — api-contracts.md

## Contratos das Funções Remotas (Google Apps Script)

Todas as funções são chamadas pelo frontend via `google.script.run` e retornam objetos padronizados com estrutura:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

---

### 1. `getInitialData()`
- **Descrição:** Carrega em uma única chamada os produtos ativos, configurações da loja e resumo do dashboard.
- **Retorno:**
  ```json
  {
    "success": true,
    "data": {
      "products": [ /* lista de produtos */ ],
      "config": {
        "NOME_MERCADINHO": "Mercadinho Pro",
        "CNPJ_CPF": "12.345.675/0001-90",
        "ENDERECO": "Rua Principal, 500",
        "MENSAGEM_RODAPE": "Volte Sempre!"
      },
      "userEmail": "operador@gmail.com"
    }
  }
  ```

---

### 2. `saveProduct(productData)`
- **Parâmetro `productData`:**
  ```json
  {
    "id": "PRD-12345", // se vazio, cria novo
    "codigoBarras": "7891000100103",
    "nome": "Leite Integral 1L",
    "categoria": "Laticínios",
    "precoCusto": 4.10,
    "precoVenda": 5.89,
    "estoqueAtual": 60,
    "estoqueMinimo": 12,
    "unidade": "UN"
  }
  ```
- **Retorno:** Objeto com o produto salvo e mensagem de sucesso.

---

### 3. `processSale(salePayload)`
- **Parâmetro `salePayload`:**
  ```json
  {
    "subtotal": 35.40,
    "desconto": 2.00,
    "total": 33.40,
    "formaPagamento": "DINHEIRO",
    "valorRecebido": 50.00,
    "troco": 16.60,
    "itens": [
      {
        "idProduto": "PRD-12345",
        "nomeProduto": "Leite Integral 1L",
        "quantidade": 2,
        "precoUnitario": 5.89,
        "totalItem": 11.78
      }
    ]
  }
  ```
- **Retorno:**
  ```json
  {
    "success": true,
    "data": {
      "idVenda": "VND-20260821-0001",
      "dataHora": "2026-08-21T14:30:00.000Z",
      "total": 33.40,
      "formaPagamento": "DINHEIRO",
      "valorRecebido": 50.00,
      "troco": 16.60,
      "itens": [ /* itens salvos */ ]
    }
  }
  ```

---

### 4. `getDashboardMetrics()`
- **Descrição:** Retorna dados consolidados para os cards de KPI, gráficos e lista de estoque crítico.
- **Retorno:**
  ```json
  {
    "success": true,
    "data": {
      "faturamentoHoje": 1420.50,
      "vendasHojeQtd": 42,
      "ticketMedioHoje": 33.82,
      "itensEstoqueCriticoQtd": 3,
      "produtosEstoqueCritico": [ /* produtos com estoque <= minimo */ ],
      "topProdutosMaisVendidos": [
        { "nome": "Pão Francês KG", "quantidade": 18, "faturamento": 234.00 }
      ],
      "vendasUltimos7Dias": [
        { "data": "15/08", "total": 1250.00 },
        { "data": "16/08", "total": 1420.50 }
      ]
    }
  }
  ```

---

### 5. `getSalesHistory(filters)`
- **Parâmetros:** `dataInicio`, `dataFim`, `limit` (padrão: últimas 50 vendas).
- **Retorno:** Lista de vendas detalhadas com status e lista de itens para reimpressão de cupom.
