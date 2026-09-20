---
name: secure-feature-implementation
description: Executa o fluxo ponta a ponta de implementação de novas features com segurança, seguindo Research -> Plan -> Implement -> Verify -> Review.
---

# Skill: Secure Feature Implementation

## Quando Invocar
- Ao desenvolver qualquer nova funcionalidade full-stack envolvendo rotas, regras de negócio, interfaces de usuário ou persistência.

## Procedimento de Execução
1. **Fase RESEARCH:**
   - Leia `docs/specs/main.md`, `architecture.md`, `domain.md` e `security.md`.
   - Consulte o grafo via `graphify-context` para mapear dependências e pontos de extensão.
   - Não edite arquivos nesta fase.
2. **Fase PLAN:**
   - Elabore o plano de alteração em `docs/plans/` listando arquivos novos, contratos alterados e estratégia de testes.
   - Defina checklist de validação de entrada, autorização anti-IDOR e proteção contra injeções.
3. **Fase IMPLEMENT:**
   - Implemente em pequenos blocos desacoplados (Use Cases -> Repositories -> Controllers -> UI Components).
4. **Fase VERIFY:**
   - Execute a suíte de testes unitários, testes de integração, type check e linter.
5. **Fase REVIEW & REPORT:**
   - Realize a auditoria de segurança e Clean Code.
   - Execute a skill `task-report` para documentar a entrega.
