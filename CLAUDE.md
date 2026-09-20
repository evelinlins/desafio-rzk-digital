# [NOME_DO_PROJETO] — CLAUDE.md

## Idioma de trabalho

- Responder e documentar preferencialmente em português do Brasil.
- Código, nomes de variáveis e commits podem seguir o padrão do time (inglês recomendado para código).

## Antes de qualquer tarefa

1. Leia `/docs/specs/main.md`.
2. Leia `/docs/specs/architecture.md`.
3. Leia `/docs/specs/domain.md`.
4. Leia `/docs/specs/security.md`.
5. Leia `/docs/specs/quality.md`.
6. Identifique regras aplicáveis em `.claude/rules/`.

## Stack do projeto

- Backend: [Spring Boot / Flask / FastAPI / ASP.NET Core / NestJS]
- Frontend: [React / Next.js / Vite]
- Banco: [MySQL / PostgreSQL / SQL Server / MongoDB]
- ORM / Migrations: [JPA+Flyway / SQLAlchemy+Alembic / EF Core / Prisma / TypeORM]
- Testes: [JUnit / pytest / xUnit / Jest / Vitest / Playwright]

## Workflow obrigatório (RPI)

1. **RESEARCH:** ler contexto, consultar grafo e não editar código.
2. **PLAN:** criar plano claro com arquivos impactados e testes.
3. **IMPLEMENT:** codificar em blocos pequenos e coesos.
4. **VERIFY:** rodar lint, testes e build.
5. **REVIEW & REPORT:** auditar segurança e gerar relatório em `docs/tasks/`.

## Regras ativas

- @.claude/rules/agent-security.md
- @.claude/rules/dependency-security.md
- @.claude/rules/information-security.md
- @.claude/rules/authentication-security.md
- @.claude/rules/authorization-security.md
- @.claude/rules/input-validation.md
- @.claude/rules/no-injection.md
- @.claude/rules/backend-security.md
- @.claude/rules/frontend-security.md
- @.claude/rules/database-security.md
- @.claude/rules/devops-security.md
- @.claude/rules/clean-code.md
- @.claude/rules/solid.md
- @.claude/rules/reuse.md
- @.claude/rules/data-structures-performance.md
- @.claude/rules/task-report.md

## Regras invioláveis

- NUNCA ler, imprimir ou versionar segredos.
- NUNCA remover autenticação ou autorização para resolver bugs.
- NUNCA concatenar entrada do usuário em SQL, shell, template ou query.
- NUNCA rodar migration em produção sem runbook e aprovação.
- NUNCA expor stack trace, token, senha ou dado sensível em resposta ou log.
- NUNCA adicionar dependência sem justificativa.
- NUNCA ignorar teste quebrado sem registrar motivo.
- NUNCA usar dados reais em ambiente local sem anonimização.

## Graphify (Grafo de Conhecimento)

- Se `graphify-out/graph.json` existir, consulte o grafo antes de ler arquivos individualmente:
  - `python -m graphify query "<contexto>"` para busca semântica / BFS.
  - `python -m graphify path "<A>" "<B>"` para relacionamentos.
  - `python -m graphify explain "<Componente>"` para focar em nós específicos.
- Após modificações no código, execute `python -m graphify . --update` para manter o grafo atualizado (AST local sem custo de LLM).
- Para mapear o projeto pela primeira vez: `python -m graphify .`

## Critério de pronto

- Código compila e passa no type check.
- Testes unitários e de integração passam.
- Linter e formatação passam.
- Build do projeto passa.
- Não há segredos expostos.
- Não há regressão evidente.
- Documentação e Task Report (`docs/tasks/`) foram atualizados.
