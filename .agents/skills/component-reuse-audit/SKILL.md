---
name: component-reuse-audit
description: Audita duplicações em componentes frontend e serviços backend para promover reaproveitamento limpo e evitar overengineering.
---

# Skill: Component & Service Reuse Audit

## Procedimento de Execução
1. **Identificação de Padrões Repetidos:**
   - Analise componentes visuais e funções utilitárias em busca de regras ou layouts duplicados em $\ge 3$ locais.
2. **Avaliação de Abstração:**
   - Verifique se a extração em componente compartilhado (`packages/ui` ou `packages/shared`) preserva clareza e flexibilidade sem criar acoplamento indevido.
3. **Refatoração Segura:**
   - Extraia o componente com props tipadas e documentadas.
   - Atualize os pontos consumidores e valide que nenhum comportamento foi quebrado.
   - Execute a suíte de testes.
