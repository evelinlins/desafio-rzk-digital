---
name: db-migration-safe
description: Guia e valida a criação e execução de migrations de banco de dados com garantia de zero-downtime, rollback seguro e integridade referencial.
---

# Skill: Safe Database Migration

## Procedimento de Execução
1. **Análise de Impacto:**
   - Verifique tabelas e índices afetados.
   - Para alterações destrutivas (renomear/excluir coluna), adote o padrão expand/contract em deploys separados.
2. **Escrita do Script de Migração:**
   - Escreva o script de migração para cima (`up`) e o script exato de reversão (`down`).
   - Garanta que novas colunas `NOT NULL` possuam valor padrão explícito ou script de backfill.
3. **Validação em Ambiente de Teste:**
   - Execute o apply da migration no banco local de testes.
   - Execute o rollback da migration e confira se o schema retornou ao estado original sem perda.
4. **Documentação Operacional:**
   - Registre o procedimento em `docs/runbooks/` caso a migration afete grandes volumes em produção.
