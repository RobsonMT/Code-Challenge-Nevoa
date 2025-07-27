# 📘 Projeto Fullstack de Cursos (Backend + Frontend)

Este repositório contém duas aplicações:

- 📦 **Backend**: API REST com Node.js, Express, TypeORM e PostgreSQL
- 💻 **Frontend**: Interface web com Next.js e TailwindCSS

---

## 🧱 Requisitos para rodar localmente

- Node.js (v18+ recomendado)
- PostgreSQL (v15+)
- Yarn ou npm (Yarn recomendado)
- Git

---

## 📂 Estrutura do Projeto

```
.
├── backend/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/ ou pages/
│   ├── package.json
│   └── tailwind.config.js
```

---

## 🧑‍💻 1. Configurando o Banco de Dados

1. Inicie o PostgreSQL localmente.
2. Crie um banco chamado:

```bash
psql -U postgres
CREATE DATABASE course_db;
```

3. Você pode usar `pgAdmin`, DBeaver ou CLI para isso.

---

## ⚙️ 2. Configurando o Backend

### Acesse a pasta:

```bash
cd backend
```

### Instale as dependências:

```bash
yarn install
```

### Configure o `.env`:

Crie o arquivo `backend/.env` com o conteúdo abaixo:

```env
POSTGRES_USER=postgres
POSTGRES_PWD=1234
POSTGRES_DB=course_db
DB_HOST=localhost
SECRET_KEY=secret
EXPIRES_IN=1h
RUN_PORT=8000
```

> Ajuste `POSTGRES_PWD` conforme sua configuração local.

### Compile o TypeScript:

```bash
yarn build
```

### Rode as migrações:

```bash
yarn migration:run
```

### Inicie o servidor:

```bash
yarn start
```

> A API estará em: [http://localhost:8000](http://localhost:8000)

---

## 🌐 3. Configurando o Frontend

### Acesse a pasta:

```bash
cd ../frontend
```

### Instale as dependências:

```bash
yarn install
```

### Rode o servidor Next.js:

```bash
yarn dev
```

> A aplicação web estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Endpoints principais da API

| Método | Rota             | Descrição              |
|--------|------------------|------------------------|
| POST   | /register        | Registro de usuário    |
| POST   | /login           | Login e token JWT      |
| GET    | /courses/public  | Listar cursos públicos |
| CRUD   | /courses         | Gerenciar cursos       |

---

## 🧪 Scripts úteis no backend

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/server.js",
  "dev": "ts-node-dev src/server.ts",
  "migration:run": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/data-source.ts"
}
```

---

## 📌 Dicas

- Certifique-se de que o PostgreSQL está rodando e aceitando conexões em `localhost:5432`.
- Use o comando `yarn dev` no backend para hot-reload durante o desenvolvimento.
- Use ferramentas como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para testar a API.

---

## ❓ Dúvidas?

Abra uma **issue** no repositório ou entre em contato com o autor. 😉
