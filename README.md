# Controle de Gastos Residenciais

## Tecnologias Utilizadas

- **Back-end:** C#, .NET 8, Entity Framework Core
- **Banco de Dados:** SQLite
- **Front-end:** React, TypeScript, Bootstrap

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- [.NET 8 SDK]
- [Node.js]

## Como Executar o Projeto

### Preparar e Rodar o Back-end (API)

Abra o terminal na pasta raiz do projeto e execute os seguintes comandos:

```bash
# Navegar até a pasta da API
cd ControleGastos/ControleGastos.Api

# Caso você não possua a ferramenta do Entity Framework será necessário instalar e fazer um restore.
dotnet tool install --global dotnet-ef
dotnet restore

# Gerar o banco de dados SQLite
dotnet ef database update

# Iniciar a aplicação
dotnet run
```

> **Nota:** A API está configurada para rodar em **http://localhost:5078**. O Swagger pode ser acessado em [http://localhost:5078/swagger](http://localhost:5078/swagger).

### Rodar o Front-end (Web)

Abra um **novo terminal** na pasta raiz do projeto:

```bash
# Navegar até a pasta do Front-end
cd ControleGastos/ControleGastos.FrontEnd

# Instalar as dependências do projeto
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

> O sistema abrirá automaticamente no navegador (geralmente em [http://localhost:5173](http://localhost:5173)).

---

## Observações de Desenvolvimento

- **Banco de Dados:** Ao rodar o comando `database update`, um arquivo chamado `ControleGastos.db` será criado na pasta da API, contendo toda a estrutura necessária.
