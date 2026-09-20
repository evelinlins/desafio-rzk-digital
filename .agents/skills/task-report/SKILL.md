---
name: task-report
description: Gera o documento de relatório obrigatório ao fim de cada task implementada. Registra tokens com e sem Graphify, assertividade do grafo, arquivos modificados, resultados de testes e riscos.
---

# Skill: Task Report Generation

## Quando Invocar
- Imediatamente ao concluir a implementação e os testes de qualquer tarefa, antes de declarar a tarefa pronta.

## Procedimento de Execução
1. **Coleta de Métricas:**
   - Liste as queries Graphify executadas e anote a quantidade de nós retornados (`nós surfaced`).
   - Identifique quais nós foram efetivamente lidos ou alterados (`nós utilizados`).
   - Calcule os tokens consumidos pelas queries + tokens dos arquivos lidos (`tokens_com_graphify`).
   - Calcule a estimativa de leitura ingênua de todos os arquivos do repositório (`tokens_sem_graphify`).
2. **Cálculo dos Indicadores:**
   - $\text{fator de redução} = \text{tokens\_sem\_graphify} \div \text{tokens\_com\_graphify}$
   - $\text{assertividade} = (\text{nós utilizados} \div \text{nós surfaced}) \times 100\%$
3. **Escrita do Documento:**
   - Crie o arquivo `docs/tasks/YYYY-MM-DD-[feature].md` preenchendo o template completo com tabela de arquivos, métricas de tokens, resultados de testes e riscos.
