<div align="center">
  <a href="https://github.com/DarlonGomes/sing-a-song-test">
    <img src="https://avatars.githubusercontent.com/u/116109353?s=200&v=4" alt="Driven logo" width="100">
  </a>

  <h3 align="center">Driven.t API</h3>
  <div align="center">
    23th Project from Driven Education
    <br />
  </div>
  <div align="center">
    Um software White Label para gerenciamento de um único evento, com opções de modalidades, alojamento, atividades e certificado.
    <br />
  </div>
</div>

<div align="center">
  <h3>Feito com</h3>

  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
   ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
   ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
   ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
  
</div>

<!-- Table of Contents -->

<div align="center" style="margin-top: 50px">
    <h1> Sumário </h1>
</div>

## Features

-   Autenticação de usuário
-   CRUD de informações do usuário
-   Inscrição para o evento
-   Formulário para validação de pagamento
-   Hospedagem
-   Exibição e inscrição em atividades

</br>

<div align="center" >
    <h1> Referência da API</h1>
</div>


### Criar uma conta

```http
POST /users
```

#### Requisição:

| Corpo         | Tipo     | Descrição                            |
| :------------| :------- | :--------------------------------------- |
| `email`      | `string` | **Required**.                            |
| `password`   | `string` | **Required**.                            |


####


</br>

#

### Logar em sua conta

```http
POST /auth/sign-in
```

#### Requisição:

| Corpo         | Tipo     | Descrição                            |
| :------------| :------- | :--------------------------------------- |
| `email`      | `string` | **Required**.                            |
| `password`   | `string` | **Required**.                            |

#### Resposta:

```json
{
  "user": {
    "id": 2,
    "email": "fake_email@gmail.com"
  },
  "token": "YOUR_SECRET_TOKEN"
}
```

#


### Receber dados básicos do evento

```http
GET /event
```
#### Resposta:

```json
{
  "id": 1,
  "title": "Driven.t",
  "backgroundImageUrl": "linear-gradient(to right, #FA4098, #FFD77F)",
  "logoImageUrl": "https://files.driveneducation.com.br/images/logo-rounded.png",
  "startsAt": "2022-10-24T17:26:05.737Z",
  "endsAt": "2022-11-14T17:26:05.737Z",
  "priceId": 1
}
```

#

### Receber valores do evento

```http
GET /event/prices
```
### Requisição:

| Parâmetro      | Tipo     | Descrição                            |
| :------------| :------- | :--------------------------------------- |
| `header`      | `string` | **Required**.                            |

### Exemplo: 
```json
{
   headers:{
      Authorization: "Bearer SEU_TOKEN_IRADO"
   }
}
```
#### Resposta:

```json

{
  "id": 1,
  "online": 10000,
  "inPerson": 25000,
  "withHotel": 35000,
  "withoutHotel": 0,
  "createdAt": "2022-10-24T17:26:05.730Z",
  "updatedAt": "2022-10-24T17:26:05.731Z"
}
```

#

### Se inscrever

```http
ṔOST /enrollments
```

#### Requisição:

| Parâmetro      | Tipo     | Descrição                            |
| :------------| :------- | :--------------------------------------- |
| `header`      | `string` | **Required**.                            |


| Corpo         | Tipo     | Descrição                            |
| :--------------- | :------- | :--------------------------------- |
| `name`         | `string`| **Required**.          |
| `cpf`         | `string`| **Required**.          |
| `birthday`         | `integer`| **Required**.          |
| `phone`         | `integer`| **Required**.          |
| `address`         | `object`| **Required**.          |
| `cep`         | `integer`| **Required**.          |
| `city`         | `integer`| **Required**.          |
| `number`         | `integer`| **Required**.          |
| `state`         | `integer`| **Required**.          |
| `neighborhood`         | `integer`| **Required**.          |
| `addressDetail`         | `integer`| **Required**.          |

### Exemplo:

```json
//Parâmetro
{
   headers:{
      Authorization: "Bearer SEU_TOKEN_IRADO"
   }
}
//Corpo
{
  "name": "Fake name",
  "cpf": "77407979103",
  "birthday": "2020-01-01T00:00:00.000Z",
  "phone": "(21) 98999-9999",
  "address": {
    "cep": "90830-563",
    "street": "Fake Street",
    "city": "Fake City",
    "number": "12345",
    "state": "MG",
    "neighborhood": "Fake Neighborhood",
    "addressDetail": "fake detail"
  }
}
```

#

### Receber dados do usuário
```http
GET /enrollments
```

### Requisição:
| Parâmetro      | Tipo     | Descrição                            |
| :------------| :------- | :--------------------------------------- |
| `header`      | `string` | **Required**.                            |

### Exemplo:

```json
{
   headers:{
      Authorization: "Bearer SEU_TOKEN_IRADO"
   }
}
```


#### Resposta:

```json

{
  "id": 1,
  "name": "Fake name",
  "cpf": "77407979103",
  "birthday": "2020-01-01T00:00:00.000Z",
  "phone": "(21) 98999-9999",
  "address": {
    "id": 2,
    "cep": "90830-563",
    "street": "Fake Street",
    "city": "Fake City",
    "state": "MG",
    "number": "12345",
    "neighborhood": "Fake Neighborhood",
    "addressDetail": "fake detail"
  }
}
```

#

### Criar registro de pagamento (beta)
```http
POST /registrations
```


#### Requisição:
|Parâmetro |Tipo | Descrição |
|:---------|:----|:----------|
| `header` | `string` | **Required** |

| Corpo         | Tipo    | Descrição                      |
| :--------------- | :------- | :--------------------------------- |
| `type`         | `string`| **Required**.          |
| `charge`         | `integer`| **Required**.          |



### Exemplo:

```json

// Parâmetro
{
   headers:{
      Authorization: "Bearer SEU_TOKEN_IRADO"
   }
}

// Corpo
{
  "type": "online",
  "charge": 1000
}
```
#
### Receber dados do pagamento
```http
GET /registrations
```


#### Requisição:

| Parâmetro         | Tipo    | Descrição                      |
| :--------------- | :------- | :--------------------------------- |
| `header`         | `string`| **Required**.          |




### Exemplo:

```json
{
   headers:{
      Authorization: "Bearer SEU_TOKEN_IRADO"
   }
}
```

### Resposta:

```json
{
  "id": 1,
  "userId": 2,
  "eventId": 1,
  "type": "online",
  "charge": 1000,
  "createdAt": "2022-10-24T18:06:49.343Z",
  "updatedAt": "2022-10-24T18:06:49.344Z"
}
```
#

## Experimente você mesmo

Clone o projeto

```bash
    git clone https://github.com/T6-Drivent/drivent-back
```

Vá para o diretório do projeto

```bash
    cd drivent-back/
```
#

### Docker

Instale a imagem do PostgreSQL

```bash
    npm run dev:postgres
```

Inicie a imagem do projeto
```bash
     npm run dev:docker
```

Pronto, o servidor já estará funcionando.

### Localmente

Instale as dependências

```bash
     npm install
```

Gere a instância do PrismaORM

```bash
    npx prisma generate 
```
Instale as migrações do PrismaORM

```bash
    npx prisma migrate dev 
```
Inicie o servidor

```bash
    npm run dev
```
# 

## Testes

<br/>

### Localmente

Popule os dados no seu ambiente de teste

```bash
    npm run test:migration:generate
```

Rode todos os testes

```bash
    npm run test
```

Testes unitários

```bash
    npm run test:unit
```

Testes de integração
```bash
    npm run test:int
```

Testes de "schemas"
```bash
    npm run test:schema
```

#

## Aprendizado
- Jest: integration tests
- Jest: unit tests
- Jest: mock data
- Cypress: E2E tests
- Cypress: create a command
- Cypress: DOM elements 

# 

## Acknowledgements

-   [Badges for Github](https://dev.to/envoy_/150-badges-for-github-pnk)

#

## Autores

-   [Arthur Akira](https://github.com/akiraTatesawa)
-   [Ayrton Porto](https://github.com/Ikusa0)
-   [Carla Dayane](https://github.com/cdayane00)
-   [Darlon Gomes](https://github.com/DarlonGomes)


