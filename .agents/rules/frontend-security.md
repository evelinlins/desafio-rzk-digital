# Rule: Segurança frontend

## XSS e Renderização Segura
- NUNCA utilize `dangerouslySetInnerHTML` ou inserção direta de HTML sem sanitização com biblioteca comprovada (ex: DOMPurify).
- Confie no auto-escaping dos frameworks modernos (React, Vue, Angular).
- Configure Content Security Policy (CSP) restritivo.

## Gestão de Tokens no Navegador
- NUNCA armazene tokens de autenticação sensíveis ou chaves em `localStorage` quando cookies `HttpOnly` com flag `Secure` puderem ser utilizados.
- NUNCA exponha credenciais ou tokens em URLs, logs de console ou mensagens de erro na tela.

## CSRF e Proteção de Mutações
- Aplique `SameSite=Strict` ou `Lax` em cookies de sessão.
- Para APIs baseadas em cookies, exija cabeçalhos customizados ou tokens anti-CSRF em requisições de mutação (POST/PUT/DELETE).

## Regras de Negócio e Componentes
- Componentes de UI não devem conter regras de negócio críticas.
- A restrição visual de botões ou menus não substitui validação de segurança no servidor.
