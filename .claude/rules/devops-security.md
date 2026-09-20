# Rule: Segurança DevOps e Infraestrutura

## Pipelines de CI/CD
- Todos os builds de PR devem executar validações automáticas: lint, testes unitários, testes de integração, type check e scanners de segurança de dependências.
- Segredos de build e chaves de deploy devem ser gerenciados em Secret Managers seguros e nunca expostos em logs do pipeline.
- Deploys em produção exigem homologação e aprovação conforme criticidade.

## Containers e Docker
- Utilize imagens base mínimas e oficiais (ex: `alpine`, `distroless`, `slim`).
- NUNCA execute containers como usuário `root` (configure diretiva `USER appuser`).
- NUNCA copie `.env`, chaves privadas, tokens ou arquivos locais de desenvolvimento para a imagem Docker (`.dockerignore` obrigatório).
- Utilize compilação multi-stage para manter a imagem final enxuta e segura.

## Nuvem e Rede
- Isole bancos de dados e serviços internos em redes privadas/VPCs sem IP público.
- Configure backups automatizados periódicos com testes de restauração regulares.
- Implemente monitoramento contínuo de erros, latência, métricas de hardware e alertas de anomalia.
