# [NOME_DO_PROJETO] — security.md

## Matriz de Segurança e Conformidade

### Autenticação
- Mecanismo: [JWT / OAuth2 / Session Cookies HttpOnly]
- Hash de senhas: [Argon2id / bcrypt (work factor >= 12)]
- Política de MFA: [Obrigatório para admin / Opcional para usuários]
- Duração de tokens: Access Token (15 min), Refresh Token (7 dias, revogável)

### Autorização
- Modelo: [RBAC / ABAC / Multi-tenant isolado]
- Prevenção IDOR/BOLA: Toda consulta deve filtrar explicitamente por `tenantId` e validar propriedade do recurso no backend.

### Proteção de Dados e LGPD
- Minimização de dados em formulários e APIs.
- Criptografia em trânsito (TLS 1.3) e em repouso (AES-256).
- Logs sanitizados (sem senhas, tokens, cartões, CPFs ou PII).

### Prevenção contra Injeções e Ataques
- Queries 100% parametrizadas (proibido concatenar SQL/NoSQL/Shell/HTML).
- Sanitização de saída e CSP rigoroso contra XSS.
- Rate limiting em rotas de autenticação, upload e busca pesada.
