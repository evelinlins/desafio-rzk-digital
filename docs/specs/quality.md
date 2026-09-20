# [NOME_DO_PROJETO] — quality.md

## Padrões de Qualidade e Critérios de Aceite

### Cobertura de Testes
- Cobertura mínima obrigatória: 80% em regras de negócio e use cases.
- Testes unitários para toda lógica de domínio e serviços.
- Testes de integração para repositórios, migrations e endpoints de API.
- Testes E2E para fluxos críticos de usuário.

### Linters, Formatadores e Tipagem
- TypeScript em modo `strict: true` (proibido `any` sem justificativa formal).
- Python: `ruff`, `black`, `mypy` / Pydantic.
- Java: `Spotless` / Checkstyle.
- C#: `dotnet format` e nullable reference types ativos.

### Critérios de Aceite para PR / Finalização de Tarefas
1. O código compila sem warnings ou erros.
2. Todos os testes unitários e de integração passam.
3. Lint e formatação validados no CI/local.
4. Nenhuma informação sensível ou segredo adicionado.
5. Documentação de API, specs e Task Report (`docs/tasks/`) devidamente atualizados.
