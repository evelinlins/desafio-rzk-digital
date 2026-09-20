# Plan — [FEATURE / TAREFA]

## Objetivo

[Resumo objetivo da mudança ou funcionalidade a ser implementada.]

## Arquivos a Criar

- `[caminho/do/arquivo]`

## Arquivos a Alterar

- `[caminho/do/arquivo]`

## Contratos Impactados

- **API:** [Endpoints novos ou modificados]
- **Banco de Dados:** [Tabelas, colunas, migrations]
- **Frontend:** [Páginas, componentes, hooks]
- **Autenticação / Autorização:** [Permissões, roles, tokens]
- **Testes:** [Suítes unitárias, integração e E2E]

## Estratégia de Testes

- [ ] Testes Unitários: [Casos de teste]
- [ ] Testes de Integração: [Fluxos e persistência]
- [ ] Testes E2E: [Cenários de usuário]
- [ ] Testes de Segurança: [Casos negativos, permissão, sanitização]

## Checklist de Segurança e Qualidade

- [ ] Validação rigorosa de entrada (DTO / Schema)
- [ ] Autorização e verificação de propriedade no backend (Anti-IDOR)
- [ ] Sanitização e escaping de dados de saída (Anti-XSS/Injection)
- [ ] Nenhum segredo ou chave exposta em código ou logs
- [ ] Logs livres de dados sensíveis (PII / Senhas / Tokens)
- [ ] Dependências auditadas e sem CVEs críticas
