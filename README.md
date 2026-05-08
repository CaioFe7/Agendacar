# AgendaCar v2 🚗

Sistema de agendamento/aluguel de carros reconstruído com a nova stack obrigatória do semestre.

## Stack

| Camada | Tecnologia |
|---|---|
| Back-End | Node.js + Express |
| ORM / Banco | Sequelize + MySQL |
| Front-End | React + Vite |
| Estilização | Tailwind CSS |
| Autenticação | JWT + bcryptjs |
| Chatbot ML | `natural` (Naive Bayes, offline) |

---

## Pré-requisitos

- Node.js 18+
- MySQL rodando localmente
- Banco `agendacar` criado no MySQL:
  ```sql
  CREATE DATABASE agendacar;
  ```

---

## Rodando o projeto

### 1. Backend

```bash
cd backend
cp .env.example .env    # ajuste DB_USER, DB_PASS e JWT_SECRET
npm install
npm run seed            # popula os 4 carros originais
npm run dev             # http://localhost:3001
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev             # http://localhost:5173
```

---

## Rotas da API

### Autenticação
| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/cadastrar` | Cadastra novo usuário (senha hasheada) |
| POST | `/auth/login` | Retorna JWT |

### Carros (CRUD via Sequelize)
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/carros` | — | Lista todos os carros |
| GET | `/carros/:id` | — | Busca carro por ID |
| POST | `/carros` | ✓ | Cria novo carro |
| PUT | `/carros/:id` | ✓ | Atualiza carro |
| DELETE | `/carros/:id` | ✓ | Remove carro |

### Reservas (CRUD via Sequelize)
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/reservas` | ✓ | Lista reservas do usuário logado |
| GET | `/reservas/:id` | ✓ | Busca reserva por ID |
| POST | `/reservas` | ✓ | Cria reserva (calcula valorTotal) |
| PUT | `/reservas/:id` | ✓ | Atualiza reserva |
| DELETE | `/reservas/:id` | ✓ | Cancela reserva |

### Chatbot
| Método | Rota | Descrição |
|---|---|---|
| POST | `/chatbot` | Envia `{ mensagem }`, retorna `{ resposta }` |

---

## Testes rápidos com cURL

```bash
# Cadastrar usuário
curl -X POST http://localhost:3001/auth/cadastrar \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@test.com","senha":"123456"}'

# Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@test.com","senha":"123456"}'

# Listar carros
curl http://localhost:3001/carros

# Criar reserva (substitua TOKEN pelo JWT retornado no login)
curl -X POST http://localhost:3001/reservas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"CarroId":1,"dataInicio":"2026-06-01","dataFim":"2026-06-03","destino":"Unifecaf"}'

# Chatbot
curl -X POST http://localhost:3001/chatbot \
  -H "Content-Type: application/json" \
  -d '{"mensagem":"quanto custa o porsche?"}'
```

---

## Páginas do frontend

| Rota | Página | Descrição |
|---|---|---|
| `/login` | Login | Autenticação com JWT |
| `/cadastro` | Cadastro | Criação de conta |
| `/home` | Home | Banners + grid de carros da API |
| `/carros/:id` | Detalhe do Carro | Specs + formulário de reserva |
| `/reservas` | Minhas Reservas | Listar / cancelar reservas |
| `/admin` | Admin | CRUD completo de carros |
