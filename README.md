# Mobile Gestão

Mobile Gestão é um sistema de gestão de entregas para distribuidores de frutas e hortifruti. O projeto permite o gerenciamento de entregas, rastreamento de entregadores, análise de métricas e histórico de entregas.

## Funcionalidades

- Gerenciamento de Entregas
- Cadastro de Entregadores, Clientes e Status
- Análise de Métricas
- Histórico de Entregas
- Autenticação de Usuários

## Tecnologias Utilizadas

- **Frontend:** React, Material-UI
- **Backend:** Node.js, Express.js, MongoDB
- **Autenticação:** JWT (JSON Web Tokens)
- **Outras:** Axios, Chart.js

## Instalação

### Pré-requisitos

- Node.js e npm/yarn instalados
- MongoDB configurado

### Passos para instalar

1. Clone o repositório:
    ```sh
    git clone https://github.com/feliperanon/mobilegestao.git
    cd mobilegestao
    ```

2. Instale as dependências do backend:
    ```sh
    cd backend
    npm install
    ```

3. Instale as dependências do frontend:
    ```sh
    cd ../frontend
    yarn install
    ```

4. Configure as variáveis de ambiente:
    Crie um arquivo `.env` na pasta `backend` com as seguintes configurações:
    ```sh
    MONGO_URI=mongodb://localhost:27017/mobilegestao
    JWT_SECRET=sua_chave_secreta
    PORT=5008
    ```

## Uso

### Iniciar o backend
```sh
cd backend
npx nodemon src/index.js
