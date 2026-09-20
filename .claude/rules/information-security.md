# Rule: Segurança da informação

## Classificação de Dados
- Classifique dados em: públicos, internos, confidenciais ou sensíveis (PII / LGPD).
- Dados pessoais exigem minimização, controle estrito de acesso e política de descarte.
- Colete exclusivamente os dados indispensáveis para a funcionalidade.

## Gestão de Segredos
- Segredos devem residir exclusivamente em Secret Managers, Vaults ou variáveis de ambiente de runtime seguras.
- NUNCA versione `.env`, certificados, chaves privadas, tokens ou dumps de banco.
- Se uma credencial for exposta acidentalmente, execute rotação e revogação imediata.

## Logs Seguros
- Proibido logar senhas, tokens de autenticação, números de cartão, CPFs/documentos, chaves criptográficas ou payloads sensíveis integrais.
- Use `correlationId` / `requestId` para rastreabilidade de requisições.
- Aplique máscaras em dados pessoais quando a inclusão em logs for indispensável para auditoria.

## Criptografia
- Em trânsito: TLS 1.3 / HTTPS obrigatório.
- Em repouso: criptografia forte para dados sensíveis.
- Hash de senhas: use algoritmos recomendados com salt (Argon2id, bcrypt com fator de trabalho adequado). NUNCA crie criptografia caseira.
