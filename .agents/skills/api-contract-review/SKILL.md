---
name: api-contract-review
description: Valida conformidade e estabilidade dos contratos de API entre frontend, backend e consumidores externos.
---

# Skill: API Contract Review

## Procedimento de Execução
1. **Inspeção de Contratos:**
   - Compare os endpoints declarados no código com o documento `docs/specs/api-contracts.md` ou spec OpenAPI/Swagger.
2. **Validação de Schemas:**
   - Garanta que todos os campos obrigatórios e opcionais possuem tipos e regras de validação correspondentes no backend e no frontend.
3. **Verificação de Status HTTP e Erros:**
   - Assegure o uso correto de códigos HTTP (200, 201, 400, 401, 403, 404, 422, 429, 500) e payload padronizado RFC 7807.
4. **Retrocompatibilidade:**
   - Verifique que nenhuma alteração em endpoints existentes causa quebra para clientes legados sem versão nova da rota (`/v2/`).
