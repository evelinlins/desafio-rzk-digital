# Rule: Clean Code universal

## Clareza e Expressividade
- O código deve ser autoexplicativo e revelar sua intenção imediatamente.
- Nomes de variáveis, funções, classes e módulos devem ser descritivos e sem abreviações obscuras.
- Funções devem ter um único propósito principal bem delineado.

## Tamanho e Complexidade Ciclomática
- Mantenha funções pequenas e com baixo nível de aninhamento.
- Aplique o padrão **Early Return** (guard clauses) para evitar blocos `if/else` profundamente aninhados.
- Extraia funções quando houver repetição de lógica ou para isolar regras de negócio específicas.

## Comentários
- Comentários devem explicar o **porquê** de decisões não óbvias, e não narrar o que o código faz.
- Remova completamente códigos comentados; confie no histórico do Git.

## Tratamento de Erros e Exceções
- NUNCA capture exceções silenciosamente com blocos `catch` vazios.
- Trate erros de maneira consistente e previsível na camada adequada.
- Evite retornar valores mágicos ou `null` ambíguos quando tipos opcionais ou result types puderem ser utilizados.

## Simplicidade e YAGNI
- Prefira soluções simples, diretas e legíveis.
- Evite overengineering e abstrações prematuras sem caso de uso real.
