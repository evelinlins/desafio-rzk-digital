# Rule: SOLID e arquitetura sustentável

## Princípios SOLID Aplicados

### S — Single Responsibility Principle (Responsabilidade Única)
- Cada módulo, classe, hook, componente ou serviço deve possuir um único motivo para mudar.
- Controllers/Routes apenas recebem, validam formato e delegam execução.
- Repositories cuidam exclusivamente de persistência e consultas.
- Use Cases coordenam o fluxo da regra de negócio.
- Componentes de UI renderizam dados e capturam eventos de usuário.

### O — Open/Closed Principle (Aberto para Extensão, Fechado para Modificação)
- O comportamento do sistema deve poder ser estendido através de polimorfismo, adapters, estratégias ou composição sem alterar código já testado e consolidado.

### L — Liskov Substitution Principle (Substituição de Liskov)
- Subclasses ou implementações devem ser plenamente substituíveis por seus contratos base sem quebrar o funcionamento do chamador.

### I — Interface Segregation Principle (Segregação de Interfaces)
- Prefira interfaces pequenas, coesas e especializadas.
- Clientes não devem depender de métodos que não utilizam.
- Separe DTOs de entrada, saída e entidades de persistência quando seus contratos divergirem.

### D — Dependency Inversion Principle (Inversão de Dependência)
- Módulos de alto nível (domínio e regras de negócio) não devem depender de módulos de baixo nível (frameworks, banco de dados, bibliotecas externas). Ambos devem depender de contratos/interfaces (Portas e Adaptadores).
