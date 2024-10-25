## Fundamentos do DDD

DDD -> Não tem relação direta com código, muito menos com camadas externas do código
É uma metodologia de design de software ou seja uma forma de converter um problema real em uma aplicação de software
E como traduzir o problema real do cliente para uma linguagem de domínio 
Quando falamos de DDD não mencionamos linguagem, framework, tecnologia, entre outros.

# DDD (Domain-Driven Design) - Design dirigido à domínio

Como vamos *desenhar* nossa aplicação, sem relaç~ao com tecnologias, pastas, arquivos, etc.
É como vamos converter o problema real do cliente em uma aplicação de software.

### Domínio

Antes de desenvolvermos a aplicação em si, "por a mão na massa" precisamos entender o problema principal que a aplicação irá resolver
então antes de tudo devemos compreender o objetivo daquele software

- Domain Experts => Especialistas do domínio, do problema que a aplicação irá resolver (PO, PM, Stakeholders, etc)
    - Conversa -> Ilicitação de requisitos (entrevistas, pesquisas, brainstorming, etc)

- Lingugem Ubíqua
    - Linguagem universal que todas as pessoas envolvidas no projeto entendam igualmente (evitar ambiguidades, termos muito técnicos, etc)

Ex:
- Stakeholder: 
    - Cliente
    - Fornecedor
    - Atendente
    - etc
- Dev:
    - Usuário
        - role: client, supplier, attendant

# DDD fornece implementações de exemplo

- Aggregates
- Value Objects
- Domain Events
- Subdomains
- Bounded Contexts
- Entities = Não são necessáriamente tabelas no banco de dados
- UseCases

Iremos utilizar muitos exemplos práticos levando para o lado do código

## Pontos a se reforçar

- DDD não tem co-relação direta com a implementação do código muito menos com as camadas externas do software (http, persistencia, etc)
- CleanCode diz que a aplicação deve ser feita em camadas, separando internas (código limpo direto independente do contexto de uso), 
    medianas (meio termo conecta as camadas internas com externas) e externas (aonde o nosso código se comunica com o mundo externo)
- Devemos pensar em como representamos um problema externo com código sem camadas externas