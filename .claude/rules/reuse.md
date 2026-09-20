# Rule: Reaproveitamento de código e componentes

## Diretrizes de Reaproveitamento
- Reaproveite quando houver duplicação idêntica em pelo menos dois ou três locais distintos (Regra de Três).
- Reaproveite componentes visuais quando representarem padrões de design system consistentes.
- NÃO crie abstrações universais antes de conhecer as variações reais exigidas pelo domínio.
- Não transforme validações simples em frameworks internos complexos.

## Backend
- Centralize middlewares, interceptors, validações de schema e handlers globais de erro.
- Isole clients HTTP de integrações externas em classes reutilizáveis com tratamento de timeout e retries.
- Separe funções utilitárias puras de serviços que possuem dependências de infraestrutura.

## Frontend
- Mantenha componentes atômicos e genéricos em `packages/ui` ou `src/components/ui`.
- Encapsule chamadas de API e gerenciamento de estado em custom hooks reutilizáveis.
- Componentes compartilhados devem receber props explícitas e não depender de contexto global oculto.

## Monorepo
- Contratos de API, schemas DTO e tipos compartilhados residem em `packages/shared`.
- Configurações padronizadas de build, TypeScript, linter e testes residem em `packages/config-*`.
- Proibida a criação de dependências circulares entre pacotes.
