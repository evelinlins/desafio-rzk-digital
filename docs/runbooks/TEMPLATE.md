# Runbook: [NOME_DO_PROCEDIMENTO_OPERACIONAL]

- **Serviço / Componente:** [ex: Banco de Dados / Deploy API / Fila]
- **Criticidade:** [Alta | Média | Baixa]
- **Aprovação Prévia Necessária:** [Sim / Não]

## 1. Pré-Requisitos e Janela de Manutenção
- Backup verificado e funcional.
- Variáveis de ambiente configuradas no secret manager.
- Notificação prévia aos times impactados.

## 2. Passo a Passo de Execução
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

## 3. Validação Pós-Execução (Smoke Tests)
- [ ] Endpoint `/health` retornando 200 OK.
- [ ] Conectividade com banco e cache estável.
- [ ] Métricas de latência e erro dentro da normalidade.

## 4. Plano de Rollback Imediato
Em caso de falha ou anomalia:
1. Executar comando de reversão: `[comando]`
2. Restaurar snapshot/backup: `[instruções]`
3. Notificar equipe de resposta a incidentes.
