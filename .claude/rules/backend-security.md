# Rule: Segurança backend

## Endpoints e Tratamento de Erros
- Todo endpoint deve declarar DTO de entrada, DTO de saída, método, autenticação e autorização.
- NUNCA exponha stack traces ou mensagens internas de erro em respostas HTTP de produção.
- Utilize respostas de erro padronizadas (RFC 7807 Problem Details).
- Aplique rate limiting em endpoints sensíveis (login, recuperação de senha, checkout, uploads).

## Integrações Externas e Resiliência
- Configure timeouts curtos e políticas de retry com exponential backoff e jitter.
- Implemente Circuit Breakers em dependências de APIs de terceiros.
- Valide rigorosamente assinaturas criptográficas de webhooks recebidos.

## Transações e Idempotência
- Utilize transações de banco de dados para garantir atomicidade em operações que alteram múltiplas entidades.
- Implemente suporte a idempotency keys para mutações críticas financeiras ou de pedidos.
- Paginação obrigatória em todas as listagens para impedir estouro de memória (evite `LIMIT` sem teto).
