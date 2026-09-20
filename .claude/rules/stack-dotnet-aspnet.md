# Rule: ASP.NET Core & C#

## Práticas Obrigatórias
- Habilite Nullable Reference Types (`<Nullable>enable</Nullable>`).
- Utilize `record` types para DTOs imutáveis.
- Utilize FluentValidation para validação robusta de regras de entrada.
- Utilize `ProblemDetails` e middleware global de exceção para respostas de erro RFC 7807.
- Utilize Entity Framework Core com LINQ e queries parametrizadas.
- Proibido uso de `FromSqlRaw` com strings concatenadas ou não sanitizadas.
- Testes com xUnit, FluentAssertions, Moq e Testcontainers.
- Formatação de código obrigatória com `dotnet format`.
