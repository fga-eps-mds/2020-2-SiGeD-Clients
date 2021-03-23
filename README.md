# API de Clientes
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL3-blue.svg)](https://opensource.org/licenses/gpl-3.0.html)

Essa API faz parte da arquitetura de microsserviços do projeto [`NomeDoProjeto`](https://github.com/fga-eps-mds/2020-2-G4), sua funcionalidade é possibilitar o controle dos dados dos clientes. 

## Como contribuir?

Gostaria de contribuir com nosso projeto? Acesse o nosso [guia de contribuição](https://fga-eps-mds.github.io/2020-2-G4/CONTRIBUTING/) onde são explicados todos os passos.
Caso reste duvidas você também pode entrar em contato conosco criando uma issue.

## Documentação

A documentação do projeto pode ser acessada pelo nosso site em https://fga-eps-mds.github.io/2020-2-G4/ ou você pode acessar pela [NomeDoProjeto Documentação](https://fga-eps-mds.github.io/2020-2-G4/home/)

## Como rodar?

Para rodar a API é preciso usar o seguinte comando usando o docker.

```bash
docker-compose up
```
A API estará rodando na [porta 3002](http://localhost:3002).

## Rotas

**GET: `/clients/`**

Para receber os dados dos clientes ativos.

**GET: `/clients/:id`**

Para receber os dados de um cliente específico utilizando o `id`.

**POST: `/clients/create`**

Para criar um novo cliente, envie os dados nesse formato:

```json
{
    "name": "Nome do Cliente",
    "cpf": "00000000000",
    "email": "cliente@email.com",
    "phone": "999999999",
    "office": "Cargo",
    "policeStation": "Locação",
    "city": "Cidade"
}
```

**PUT: `/clients/update/:id`**

Para atualizar os dados do cliente, envie os dados atualizados seguindo o padrão:

```json
{
    "name": "Nome do Cliente",
    "cpf": "00000000000",
    "email": "cliente@email.com",
    "phone": "999999999",
    "office": "Cargo Atualizado",
    "policeStation": "Locação Atualizada",
    "city": "Cidade Atualizada"
}
```

**PUT: `/clients/deactivate/:id`**

Para desativar um cliente pelo `id`.

