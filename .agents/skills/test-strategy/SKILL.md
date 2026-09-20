---
name: test-strategy
description: Define e executa a pirâmide de testes completa para garantir cobertura de regras de negócio, persistência e fluxos críticos.
---

# Skill: Test Strategy & Automation

## Pirâmide de Testes
1. **Testes Unitários (Base):**
   - Cobertura focada em Use Cases, Entidades de Domínio, Validadores e Funções utilitárias puras.
   - Rápidos, sem dependências de rede ou banco de dados externo (use mocks/stubs).
2. **Testes de Integração (Meio):**
   - Validação de Controllers HTTP, Repositórios de Banco de Dados, Handlers de Fila e Migrations.
   - Uso de bancos em memória ou containers descartáveis (Testcontainers).
3. **Testes E2E (Topo):**
   - Teste automatizado de fluxos completos de ponta a ponta (Playwright / Cypress).
   - Focado nos caminhos críticos de negócio (Login, Cadastro, Checkout/Ação principal).
4. **Testes de Regressão e Segurança:**
   - Casos de teste negativos para validar bloqueio de IDOR, injeções, tokens inválidos e rate limit.
