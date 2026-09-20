# Rule: Segurança e integridade de banco de dados

## Queries e Consultas
- Proibido uso de SQL concatenado em qualquer circunstância.
- Todas as consultas devem utilizar queries parametrizadas ou APIs do ORM.
- Consultas sensíveis devem incluir obrigatoriamente cláusulas de filtro por usuário ou tenant (`WHERE tenant_id = :tenantId`).

## Migrations Seguras
- Toda migration de banco de dados deve possuir plano de rollback testado.
- Mudanças destrutivas (ex: exclusão de colunas, alteração de tipos) devem seguir padrão expand/contract em fases separadas.
- Proibido adicionar coluna `NOT NULL` em tabela existente sem definir valor `DEFAULT` ou executar migração de backfill.
- NUNCA execute migrations diretamente em produção sem backup prévio e janela operacional homologada.

## Princípio do Menor Privilégio no Banco
- A aplicação deve conectar ao banco com usuário contendo apenas permissões necessárias (DML: SELECT, INSERT, UPDATE, DELETE).
- Usuários para migrations (DDL) devem ser segregados e utilizados apenas no pipeline de deploy.
- Agentes de IA e ferramentas MCP devem utilizar conexões read-only por padrão.
