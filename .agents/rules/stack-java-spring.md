# Rule: Java Spring Boot

## Práticas Obrigatórias
- Use DTOs com Java Records para transferência de dados imutável.
- Aplique Bean Validation (`@Valid`, `@NotNull`, `@Size`) em todos os controllers.
- Centralize o tratamento de exceções com `@ControllerAdvice` e `@ExceptionHandler`.
- Utilize `@Transactional` em serviços com operações que exigem atomicidade e consistência.
- Separe estritamente Controllers (fino) de Services (lógica de negócio).
- Utilize Spring Data JPA Repositories com Specifications ou Queries parametrizadas (`@Query`).
- Proibido terminantemente concatenar strings em consultas JPQL ou SQL nativas.
- Testes com JUnit 5, Mockito, AssertJ e Testcontainers para testes integrados de banco.
- Migrations de banco de dados gerenciadas exclusivamente por Flyway ou Liquibase.
