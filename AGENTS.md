# [NOME_DO_PROJETO] — AGENTS.md

## Visão Geral do Ecossistema Agêntico

Este projeto segue rigorosamente o modelo de desenvolvimento agêntico universal documentado em `agentes_universais.md`, combinando **Spec-Driven Development (SDD)** e o fluxo **Research -> Plan -> Implement (RPI)** com suporte a múltiplos subagentes especializados e memória persistente via grafo de conhecimento **Graphify**.

---

## 1. Regras Invioláveis

1. **Segredos e Credenciais:** NUNCA ler, copiar, imprimir ou versionar arquivos `.env`, chaves privadas, certificados ou tokens.
2. **Segurança de Entrada e Consultas:** NUNCA interpolar ou concatenar entradas de usuário em comandos SQL, shell, scripts, templates ou queries (queries 100% parametrizadas).
3. **Controle de Acesso:** NUNCA remover ou contornar validações de autenticação, autorização ou isolamento de tenant para fazer código ou testes passarem.
4. **Resiliência e Erros:** NUNCA suprimir exceções com blocos `catch` vazios. Erros em produção nunca devem expor stack traces ou dados sensíveis.
5. **Governança de Banco:** NUNCA executar migrations em produção sem plano de rollback homologado e runbook em `docs/runbooks/`.

---

## 2. Catálogo de Sub-Agentes Especializados

| Agente | Tipo / Ferramentas | Foco Principal |
|---|---|---|
| **`architect`** | Write, Bash, Read | Arquitetura de software, ADRs (`docs/adr/`), modularização, boundaries de domínio e escalabilidade. |
| **`researcher`** | Read-Only | Exploração de codebase via Graphify e leitura de especificações em `docs/specs/`. |
| **`backend`** | Write, Bash, Read | Controllers/routes finos, use cases, services, DTOs, validações e persistência. |
| **`frontend`** | Write, Bash, Read | Páginas, componentes atômicos (UI), hooks reutilizáveis, formulários e acessibilidade. |
| **`database`** | Write, Bash, Read | Modelagem de dados, índices, otimização de queries e migrations seguras (up/down). |
| **`security-reviewer`**| Read-Only | Auditoria OWASP Top 10, IDOR/BOLA, injeções, tokens, logs seguros e dependências. |
| **`test-engineer`** | Write, Bash, Read | Pirâmide de testes: unitários, integração, E2E e garantia de cobertura ($\ge 80\%$). |
| **`code-reviewer`** | Read-Only | Clean Code, SOLID, manutenibilidade, early return e eliminação de duplicações. |
| **`devops`** | Write, Bash, Read | Dockerfiles multi-stage, pipelines CI/CD, observabilidade e secrets management. |
| **`accessibility-reviewer`** | Read-Only | Conformidade WCAG 2.1/2.2 AA, ARIA, foco por teclado e contraste de cores. |
| **`documentation-writer`** | Write, Bash, Read | Manutenção das especificações em `docs/specs/`, contratos de API e relatórios de tarefas. |

---

## 3. Workflow Obrigatório: RPI (Research -> Plan -> Implement)

1. **RESEARCH:**
   - Consultar o grafo de conhecimento com `python -m graphify query "<contexto>"`.
   - Ler especificações em `docs/specs/main.md`, `architecture.md`, `domain.md` e `security.md`.
   - Mapear dependências sem editar arquivos de código.
2. **PLAN:**
   - Estruturar o plano de alteração com arquivos a criar/alterar e checklist de segurança em `docs/plans/`.
3. **IMPLEMENT:**
   - Codificar em blocos pequenos, modulares e desacoplados.
4. **VERIFY:**
   - Executar linters, type checks, testes unitários e de integração.
5. **REVIEW & TASK REPORT:**
   - Realizar revisão de segurança e gerar relatório obrigatório em `docs/tasks/YYYY-MM-DD-[feature].md` registrando métricas de economia de tokens do Graphify.

---

## 4. Graphify (Grafo de Conhecimento)

- Mapeamento inicial do projeto: `python -m graphify .`
- Consultas semânticas: `python -m graphify query "<termo>"`
- Caminho entre componentes: `python -m graphify path "<Origem>" "<Destino>"`
- Atualização incremental pós-edição: `python -m graphify . --update`
