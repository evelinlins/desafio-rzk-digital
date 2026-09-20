# Rule: TypeScript Full-Stack (NestJS + Next.js / React)

## Padrões Globais TypeScript
- `strict: true` e `noImplicitAny: true` obrigatórios no `tsconfig.json`.
- Proibido uso do tipo `any` sem justificativa formal documentada. Prefira `unknown` com Type Guards.
- Evite coerções forçadas com `as Type` para mascarar erros do compilador.

## NestJS (Backend)
- Controllers finos apenas para mapeamento de rotas e injeção de dependência.
- Lógica de negócio isolada em Services e Use Cases.
- Validação automática com `ValidationPipe`, `class-validator` ou `zod`.
- Tratamento de erro padronizado via global `ExceptionFilter`.
- Autenticação e permissões protegidas com `Guards` (`AuthGuard`, `RolesGuard`).

## Next.js / React (Frontend)
- React Server Components para data fetching seguro sem expor credenciais ao cliente.
- Client Components (`'use client'`) apenas quando houver interatividade e estado local.
- Server Actions com validação de payload com Zod e verificação de autorização.
- Componentes visuais atômicos, desacoplados de regras de negócio pesadas.
- Custom hooks para encapsular lógica de estado e queries (`TanStack Query`).
