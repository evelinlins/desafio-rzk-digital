# Rule: Segurança de bibliotecas e dependências

## Antes de adicionar qualquer dependência
- Verifique se a funcionalidade já existe no projeto ou na biblioteca padrão da linguagem.
- Avalie a saúde do pacote: manutenção ativa, comunidade, licença compatível (MIT, Apache 2.0, BSD) e reputação.
- Prefira bibliotecas pequenas, focadas, tipadas e amplamente testadas.
- Evite bibliotecas abandonadas, sem testes ou com histórico recorrente de vulnerabilidades graves.

## Versionamento e Lockfiles
- Utilize e versione rigorosamente o lockfile (`pnpm-lock.yaml`, `package-lock.json`, `poetry.lock`, `uv.lock`, etc.).
- Proibido usar versões flutuantes ou instáveis como `latest`, `*` ou ranges amplos descontrolados.
- Ao atualizar dependências, execute suíte de testes completa, build e scanner de vulnerabilidades (ex: `audit`).

## Supply Chain Security
- Proibido instalar pacotes de repositórios não confiáveis ou sem verificação.
- Proibido executar scripts remotos sem auditoria.
- Preste atenção a erros de digitação de pacotes para evitar typosquatting.
- Audite scripts de postinstall antes de permitir execução.
