# Rule: Python Backend (FastAPI / Flask)

## Práticas Obrigatórias
- Use tipagem estática (Type Hints) em todas as funções, parâmetros e retornos.
- Utilize Pydantic models para validação e serialização estrita de entrada e saída.
- Utilize SQLAlchemy 2.0+ com queries parametrizadas (proibido f-strings em SQL).
- Utilize Alembic para versionamento e aplicação de migrations.
- Mantenha rotas enxutas (`routes.py`), isolando lógica em `services/` e persistência em `repositories/`.
- Testes com `pytest`, `pytest-cov`, fixtures e `httpx` para chamadas assíncronas.
- Proibido silenciar exceções com `except Exception: pass`. Utilize logging estruturado e relance exceções adequadas.
- Linters e formatadores obrigatórios: `ruff` e `black`.
