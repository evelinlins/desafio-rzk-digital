# Rule: Estruturas de dados, performance e segurança

## Escolha Consciente de Estruturas de Dados
- NÃO utilize listas/arrays genericamente para qualquer problema.
- Escolha a estrutura com base na operação dominante:
  - **Busca por chave:** use Hash Maps / Dicionários ($O(1)$).
  - **Validação de unicidade e pertinência:** use Hash Sets ($O(1)$).
  - **Ordem de chegada / Desacoplamento:** use Filas FIFO.
  - **Processamento por prioridade / Urgência:** use Min/Max Heaps ou Priority Queues.
  - **Hierarquias, árvores de categorias e navegação:** use Árvores balanceadas com proteção contra loops.
  - **Relacionamentos complexos muitos-para-muitos:** use Grafos com BFS/DFS e limite de profundidade.

## Análise de Complexidade Big-O
- Features que manipulam grandes volumes ou coleções devem documentar a complexidade temporal e espacial ($O(1)$, $O(\log n)$, $O(n)$, $O(n \log n)$).
- Proibido uso de loops aninhados desnecessários ($O(n^2)$). Em vez de buscar itens dentro de um loop, converta a coleção auxiliar para um `Map` indexado por chave ($O(n)$).
- Proibido executar consultas de banco dentro de loops iterativos (problema N+1); execute consultas em lote (`IN (...)`) e faça o agrupamento em memória.

## Segurança e Mitigação de DoS em Estruturas de Dados
- Defina limites máximos de tamanho para qualquer coleção populada por input de usuário ou payload HTTP.
- Aplique paginação obrigatória em todas as listagens de API.
- Em mapas/objetos dinâmicos em JavaScript/TypeScript, bloqueie chaves perigosas como `__proto__`, `prototype` e `constructor` (prevenção contra Prototype Pollution).
- Caches em memória devem possuir obrigatoriamente TTL (Time-To-Live), política de invalidação e limite máximo de itens (LRU).
