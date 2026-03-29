# Controle de Gastos Residenciais

Sistema de controle de finanças pessoais desenvolvido para teste técnico, separado em Web API e Front-end.

## Tecnologias

- **Back-end:** C#, .NET 8, Entity Framework Core, SQLite
- **Front-end:** React, TypeScript, Bootstrap

## Passo a passo para executar:

### Back-end: (API)

Abra o terminal na pasta raiz do projeto e execute os comandos abaixo para acessar a pasta da API, criar o banco de dados e iniciar o servidor:

```bash
cd ControleGastos/ControleGastos.Api
dotnet ef database update
dotnet run
```

### Front-end: (Web)

Abra um novo terminal na pasta raiz do projeto, acesse a pasta do Front-end, instale as dependências e inicie a aplicação:

```bash
cd ControleGastos/ControleGastos.FrontEnd
npm install
npm run dev
```
