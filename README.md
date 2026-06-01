# EpyTodo — Todo REST API

A REST API for a todo-list application, written in **TypeScript** with
**Express** and **MySQL** (Epitech web project). It provides JWT authentication
and full CRUD on users and todo items.

## Features

- User registration & login with **bcrypt** password hashing and **JWT** tokens
- Auth middleware protecting every `/user` and `/todos` route
- Full CRUD on users and todos, backed by a MySQL connection pool (`mysql2`)
- Consistent JSON error contract (`400 Bad parameter`, `401 Invalid Credentials`,
  `404 Not found`, `409 Account already exists`, `500 Internal server error`)

## Tech Stack

TypeScript • Node.js • Express 5 • MySQL (`mysql2`) • JWT (`jsonwebtoken`) •
`bcryptjs` • `dotenv` • `tsx`

## Getting Started

### 1. Database

```bash
mysql -u root -p < epytodo.sql      # creates the `epytodo` database and tables
```

### 2. Environment

Create a `.env` file at the project root:

```ini
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_ROOT_PASSWORD=your_password
MYSQL_DATABASE=epytodo
SECRET=your_jwt_secret
PORT=3000
```

### 3. Install & run

```bash
npm install
npm start            # runs src/index.ts with tsx
```

The server listens on `http://localhost:${PORT}` (default `3000`).

## API Endpoints

### Authentication

| Method | Route        | Auth | Body                                  | Description            |
|--------|--------------|------|---------------------------------------|------------------------|
| POST   | `/register`  | —    | `email, password, name, firstname`    | Create an account → JWT |
| POST   | `/login`     | —    | `email, password`                     | Log in → JWT            |

### Users (Bearer token required)

| Method | Route            | Description                          |
|--------|------------------|--------------------------------------|
| GET    | `/user`          | Current authenticated user           |
| GET    | `/user/todos`    | All todos of the current user        |
| GET    | `/users/:id`     | User by id                           |
| GET    | `/users/:email`  | User by email                        |
| PUT    | `/users/:id`     | Update a user                        |
| DELETE | `/users/:id`     | Delete a user                        |

### Todos (Bearer token required, prefixed by `/todos`)

| Method | Route          | Description            |
|--------|----------------|------------------------|
| GET    | `/todos`       | List every todo        |
| POST   | `/todos`       | Create a todo          |
| GET    | `/todos/:id`   | Get a todo by id       |
| PUT    | `/todos/:id`   | Update a todo          |
| DELETE | `/todos/:id`   | Delete a todo          |

Authenticated requests must send the token in the `Authorization` header
(`Bearer <token>` or the raw token).

## Data Model

- **user**: `id, email (unique), password, name, firstname, created_at`
- **todo**: `id, title, description, created_at, due_time, status, user_id`
  with `status ∈ {not started, todo, in progress, done}` and a foreign key on
  `user_id` (cascade delete).

## Project Layout

```
src/
  index.ts            Express app & route mounting
  config/db.ts        MySQL connection pool
  middleware/         JWT auth + 404 handler
  routes/
    auth/             register & login
    user/             user routes + queries
    todos/            todo routes + queries
epytodo.sql           database schema
```
