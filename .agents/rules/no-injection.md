# Rule: Prevenção contra injeção

## SQL Injection
- Proibido terminantemente concatenar ou interpolar strings em comandos SQL.
- Utilize exclusivamente ORM maduro, Prepared Statements ou Query Builders parametrizados.

## NoSQL Injection
- Valide rigorosamente tipos de dados recebidos para impedir injeção de operadores como `$gt`, `$ne`, `$where` em queries NoSQL/MongoDB.
- NUNCA repasse objetos JSON crus recebidos na requisição diretamente para métodos de busca.

## Command Injection
- Evite ao máximo executar comandos de shell a partir da aplicação.
- Quando inevitável, utilize listas de argumentos isolados (sem shell parsing) e valide parâmetros com allowlist estrita.

## Template & GraphQL Injection
- Não processe templates dinâmicos com inputs de usuários sem escaping contextual e sandbox segura.
- Limite a profundidade e a complexidade de consultas GraphQL (Query Complexity Analysis) para prevenir DoS.
