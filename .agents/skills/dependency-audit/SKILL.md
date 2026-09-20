---
name: dependency-audit
description: Audita dependências de terceiros contra vulnerabilidades conhecidas (CVEs), licenças incompatíveis e impacto de performance no bundle.
---

# Skill: Dependency Security Audit

## Procedimento de Execução
1. **Auditoria de Vulnerabilidades:**
   - Execute o scanner nativo do gerenciador de pacotes (`pnpm audit`, `npm audit`, `pip-audit`, `dotnet list package --vulnerable`).
2. **Checagem de Licenças:**
   - Valide se os pacotes possuem licenças permissivas (MIT, Apache 2.0, BSD, ISC) e não impõem restrições copyleft indesejadas (GPL rígida em código proprietário).
3. **Avaliação de Bundle Size (Frontend):**
   - Inspecione se novas bibliotecas de UI/utilitárias aumentam excessivamente o peso do bundle final (`@next/bundle-analyzer` ou `bundlewatch`).
4. **Lockfile Health:**
   - Verifique integridade do lockfile e assegure que versões exatas estão fixadas.
