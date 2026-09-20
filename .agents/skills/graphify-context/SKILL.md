---
name: graphify-context
description: Use para obter contexto arquitetural e dependências precisas do codebase com consumo mínimo de tokens. Consulta o grafo de conhecimento antes de ler arquivos individualmente.
---

# Skill: Graphify Context Exploration

## Quando Invocar
- No início de qualquer sessão de trabalho ou implementação.
- Na fase **RESEARCH** do fluxo RPI.
- Para análise de impacto antes de alterar módulos ou contratos.
- Onboarding em nova tarefa ou codebase desconhecido.

## Procedimento de Execução
1. **Verificação do Grafo:**
   - Verifique se `graphify-out/graph.json` existe. Se não existir, execute `python -m graphify .` (ou `/graphify .`).
2. **Consultas Semânticas e Estruturais:**
   - `python -m graphify query "[contexto da feature]"` — Busca por BFS para contexto amplo.
   - `python -m graphify query "[fluxo específico]" --dfs` — Busca por DFS para rastrear caminhos profundos.
   - `python -m graphify path "ComponenteA" "ComponenteB"` — Rastreia dependências diretas e indiretas entre dois módulos.
   - `python -m graphify explain "Componente"` — Fornece resumo estruturado de um nó central.
   - `python -m graphify god-nodes` — Identifica os hubs arquiteturais mais acoplados do sistema.
3. **Leitura Focada:**
   - Abra e inspecione apenas os arquivos identificados pelo subgrafo retornado.
4. **Atualização Incremental Pós-Implementação:**
   - Após modificar arquivos de código, execute `python -m graphify . --update` para reextrair a AST dos arquivos alterados sem custo de LLM.
