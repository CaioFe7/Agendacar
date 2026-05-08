# AgendaCar v2 — Setup Guide

## Stack
- **Frontend:** React 18 + Vite + Tailwind CSS + Framer Motion
- **Backend:** Node.js + Express + Sequelize + SQLite
- **Auth:** JWT com RBAC (roles: user / admin)

---

## Pré-requisitos
- Node.js 18+
- npm 9+

---

## 1. Clonar o repositório

```bash
git clone https://github.com/CaioFe7/Agendacar.git
cd Agendacar
```

---

## 2. Instalar dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## 3. Configurar variáveis de ambiente

Crie o arquivo `backend/.env` com:

```env
JWT_SECRET=agendacar_super_secret_2024
PORT=3001
DB_DIALECT=sqlite
```

> O arquivo `backend/.env.example` serve de referência.

---

## 4. Popular o banco de dados

```bash
cd backend
npm run seed
```

Isso cria:
- 4 carros: Porsche 911, T-Cross, Civic Type-R, Silverado
- Usuário admin: `admin@agendacar.com` / `admin123`

---

## 5. Rodar o projeto

Abra **dois terminais**:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Roda em http://localhost:3001
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# Abre em http://localhost:5173
```

---

## Estrutura do projeto

```
AgendaCar-v2/
├── backend/
│   ├── src/
│   │   ├── config/        # Conexão com banco (SQLite/PostgreSQL)
│   │   ├── controllers/   # Lógica de negócio
│   │   ├── middlewares/   # auth.js (JWT) + isAdmin (RBAC)
│   │   ├── models/        # Usuario, Carro, Reserva (Sequelize)
│   │   ├── routes/        # Rotas Express
│   │   ├── seeders/       # seedCarros.js + seedAdmin.js
│   │   └── server.js      # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/    # Navbar, Banner, CarCard, AnimatedScene...
    │   ├── context/       # AuthContext (JWT + role)
    │   ├── pages/         # Login, Home, Reservas, Admin...
    │   └── services/      # api.js (Axios)
    └── package.json
```

---

## Rotas da API

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| POST | `/auth/cadastro` | — | Criar conta |
| POST | `/auth/login` | — | Login → retorna JWT + role |
| GET | `/carros` | JWT | Listar carros |
| GET | `/carros/:id` | JWT | Detalhe do carro |
| POST | `/carros` | JWT + Admin | Criar carro |
| PUT | `/carros/:id` | JWT + Admin | Editar carro |
| DELETE | `/carros/:id` | JWT + Admin | Deletar carro |
| GET | `/reservas` | JWT | Minhas reservas |
| POST | `/reservas` | JWT | Criar reserva |
| GET | `/health` | — | Status do servidor |

---

## Deploy (Vercel + Render)

### Backend → Render
- Root Directory: `backend`
- Build: `npm install`
- Start: `npm run start:prod`
- Env vars: `JWT_SECRET`

### Frontend → Vercel
- Root Directory: `frontend`
- Framework: Vite
- Env vars: `VITE_API_URL=<URL do Render>`

---

## Usuário admin padrão

```
Email: admin@agendacar.com
Senha: admin123
```

O link "Admin" na navbar só aparece para usuários com `role: admin`.
