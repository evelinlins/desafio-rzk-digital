# Rule: Autenticação segura

## Fluxo de Login e Mensagens de Erro
- NUNCA informe se o erro foi usuário inexistente ou senha incorreta; retorne mensagem genérica ("Credenciais inválidas").
- Aplique rate limiting, bloqueio progressivo e proteção contra brute force.
- Exija autenticação multifator (MFA) para privilégios administrativos.

## Gestão de Senhas
- NUNCA armazene senhas em texto puro nem as registre em logs.
- Aplique políticas de complexidade de senha proporcionais ao risco do domínio.
- Tokens de recuperação de senha devem ser criptograficamente seguros, de uso único e com tempo de expiração curto (ex: 15 minutos).

## Gestão de Sessão e Tokens
- Access tokens com tempo de vida curto (ex: 15 minutos).
- Refresh tokens armazenados com segurança, com rotação automática e revogáveis em banco/cache.
- Em navegadores web, prefira cookies de autenticação com flags `HttpOnly`, `Secure` e `SameSite=Strict` ou `Lax`.
- Invalide sessões ativas no logout e revogue todas as sessões quando houver troca de senha.
