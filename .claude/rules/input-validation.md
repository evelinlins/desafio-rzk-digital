# Rule: Validação de entrada

## Validação no Backend
- Valide 100% dos dados recebidos por HTTP, WebSockets, filas, webhooks, formulários ou arquivos.
- Utilize DTOs tipados e schemas estritos (Zod, Pydantic, Bean Validation, FluentValidation, class-validator).
- Rejeite campos desconhecidos no payload (strip/reject unexpected properties).
- Defina restrições rígidas para tipos, ranges numéricos, tamanhos de string e formatos regex.

## Validação no Frontend
- Validação no cliente melhora a experiência do usuário, mas NÃO substitui a validação no servidor.
- Mensagens de erro para o usuário final devem ser claras, orientativas e não expor detalhes internos de infraestrutura.

## Sanitização e Validação de Arquivos
- Para uploads: valide tamanho máximo, extensão em allowlist, MIME type real inspecionado e renomeie o arquivo no servidor gerando nome aleatório seguro.
- Armazene uploads fora da raiz pública do servidor web ou em Object Storage privado (S3 / GCS).
