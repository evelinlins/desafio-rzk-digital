# Rule: Relatório obrigatório de tarefa (Task Report)

## Obrigação Pós-Implementação
Ao concluir qualquer funcionalidade, bugfix, refatoração ou tarefa relevante, o agente deve obrigatoriamente gerar o relatório de conclusão em `docs/tasks/YYYY-MM-DD-[feature].md`.

## Conteúdo Obrigatório do Relatório
1. **Resumo da Entrega:** Descrição sucinta do que foi construído e arquivos modificados.
2. **Queries Graphify Executadas:** Lista de comandos `/graphify` usados na fase de pesquisa.
3. **Métricas de Economia de Tokens:**
   - $\text{tokens\_com\_graphify} = \Sigma(\text{tokens de queries}) + \Sigma(\text{tokens dos arquivos lidos})$
   - $\text{tokens\_sem\_graphify} = \Sigma(\text{tokens de todos os arquivos do projeto})$
   - $\text{redução} = \text{tokens\_sem\_graphify} \div \text{tokens\_com\_graphify}$
   - $\text{assertividade} = (\text{nós utilizados} \div \text{nós surfaced}) \times 100\%$
4. **Classificação de Assertividade do Grafo:**
   - $\ge 70\%$: Alta (grafo preciso, query bem formulada)
   - $40\%\text{--}69\%$: Média (grafo útil com ruído)
   - $< 40\%$: Baixa (necessário refinar query ou ajustar budget)
5. **Resultado dos Testes:** Execução do lint, testes e build.
6. **Riscos Remanescentes:** Análise de débitos técnicos ou itens para acompanhamento.
