# Rule: Autorização segura

## Controle de Acesso no Backend
- Todo endpoint privado deve validar usuário autenticado e permissões ativas.
- Toda mutação ou consulta sensível deve validar perfil (RBAC) ou atributos/políticas (ABAC).
- NUNCA confie apenas em controles visuais no frontend (ex: esconder botão não protege endpoint).
- A autorização deve ocorrer no backend no nível mais específico do recurso.

## Prevenção contra IDOR / BOLA
- NUNCA busque ou altere recurso apenas pelo ID recebido na rota sem verificar se o recurso pertence ao usuário ou ao `tenantId` autenticado.
- Uso de UUIDs não substitui validação de propriedade.
- Em arquiteturas multi-tenant, filtre obrigatoriamente por `tenantId` em todas as queries e mutações de banco de dados.

## Auditoria de Ações Administrativas
- Todas as ações executadas por administradores devem produzir trilha de auditoria com timestamp, ID do ator, IP e ação executada.
