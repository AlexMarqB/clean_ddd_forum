### Clean Architecture
- toca na arquitetura do software/projeto 
- Não tem relação com tecnologias, frameworks ou linguagens
- Influencias diretamente na estrutua do código

## Principios

- Desacoplamento de implementações
- Camadas externas depende de camadas internas, as depencias são sempre externas para interna 

## Camadas

# Frameworks & Drivers - Infraestrutura

- Camada mais externa
- Forma de comunicação da aplicação
- Importa dos Interfaces Adapters
- Ex: HTTP, Banco de Dados, Usuário interage, outro app, etc
==>

# Interface Adapters

- Camada intermediária
- Adapta a informação da camada de infraestrutura para que a camada mais interna entenda
- Protege as camadas internas da acoplação com a camada de infraestrutura
- Inversão de dependencia => Faz com que a camada não dependa de uma implementação fixa mas sim de uma abstração/contrato
- Importa da camada de Application Business Rules
- Ex: Controllers, Presenters, Gateways, etc
==>

-> Domain, application

# Application Business Rules 

- UseCases/Services
- Camada de regras de negócio
- Não pode depender de implementações como DB, Frameworks, etc
- Importa da camada de Enterprise Business Rules
==>

# Enterprise Business Rules

- Entidades, Value Objects, Repositórios, etc