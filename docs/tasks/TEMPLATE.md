# Task Report: [NOME_DA_FEATURE]

- **Data:** [YYYY-MM-DD]
- **Agentes Envolvidos:** [ex: researcher · backend · security-reviewer]
- **Autor / Executor:** [Identificador do agente / dev]

---

## 1. Resumo da Implementação

[Breve descrição do que foi implementado, decisões tomadas e regras aplicadas.]

---

## 2. Arquivos Modificados / Criados

| Arquivo | Operação | Motivo / Responsabilidade |
|---|---|---|
| `[caminho/arquivo]` | Criado / Alterado | [Descrição] |

---

## 3. Economia de Tokens com Graphify

> **Fórmulas:**
> - `tokens_com_graphify` = $\Sigma$(tokens de queries) + $\Sigma$(tokens dos arquivos lidos)
> - `tokens_sem_graphify` = $\Sigma$(tokens de todos os arquivos do projeto se lidos naively)
> - `redução` = `tokens_sem_graphify` $\div$ `tokens_com_graphify`
> - `assertividade` = (nós utilizados na implementação $\div$ nós retornados nas queries) $\times 100\%$

| Métrica | Valor Registrado |
|---|---|
| Queries Graphify Executadas | `[ex: /graphify query "..."]` |
| Nós Surfaced pelo Grafo | `[ex: 12 nós]` |
| Nós Efetivamente Utilizados | `[ex: 9 nós]` |
| Tokens via Queries Graphify | `~[X] tokens` |
| Tokens dos Arquivos Lidos | `~[Y] tokens` |
| **Total Consumido com Graphify** | **~[X + Y] tokens** |
| **Estimativa sem Graphify** | **~[Z] tokens** |
| **Fator de Redução de Tokens** | **~[Z / (X+Y)]x** |
| **Assertividade do Grafo** | **[9/12 = 75%] (Alta: $\ge 70\%$)** |

---

## 4. Testes e Validação

- **Comando de Teste:** `[ex: pnpm test / pytest / dotnet test]`
- **Resultado:** [Passou (X testes executados, 0 falhas)]
- **Lint & Build:** [Aprovado sem erros]

---

## 5. Riscos Remanescentes e Débitos Técnicos

- [Nenhum risco crítico identificado / Débito registrado em issue #XXX]
