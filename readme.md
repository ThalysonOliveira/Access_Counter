<h1 align="center">Access Counter</h1>

<p align="center">
  <a href="#tecnologia">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#pre-requisitos">Pre-requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#como-usar">Como usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<a id="tecnologia"></a>

## 🚀 Tecnologias

Esse projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Serverless](https://www.serverless.com/)
- [Dynamodb](https://aws.amazon.com/pt/dynamodb/)
- [TypeScript](https://www.typescriptlang.org/)

<a id="pre-requisitos"></a>

## :fire: **Pré-requisitos**

- [Node.js](https://nodejs.org/en/)
- [Serverless](https://www.serverless.com/)

<a id="como-usar"></a>

## :zap: Como usar

- Faça um clone desse repositório: `https://github.com/ThalysonOliveira/Access_Counter.git`

- Instale as dependências: npm i ou yarn

- Instale o serverless em sua maquina (https://www.serverless.com/framework/docs/install-standalone)

- Configure o serverless com suas credencias: serverless config credentials --provider provider --key key --secret secret

- Inicie a sua aplicação serverless: serverless deploy

<a id="funcionalidades"></a>

## 🛠️ Funcionalidades

Sistema desenvolvido com a finalidade de colocar em pratica alguns conceitos, tais como: consumo de api utilizando biblioteca nativa do node, serverless, manipulação de dados com banco noSql dynamoDB, clean architecture, SOLID, designer patterns

- Criar uma rota para incrementar o número de acessos;
- Criar uma rota para consultar o número de acessos;
- Criar uma rota para criar um usuário;
- Criar uma rota para visualizar as informações de um usuário
