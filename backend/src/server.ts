import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';

dotenv.config();

const sequelize = require('./config/database');
require('./models');

const usuarioRoutes = require('./routes/usuarioRoutes');
const carroRoutes = require('./routes/carroRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/auth', usuarioRoutes);
app.use('/carros', carroRoutes);
app.use('/reservas', reservaRoutes);
app.use('/chatbot', chatbotRoutes);

app.get('/health', (_req: Request, res: Response) => {
  return res.json({
    status: 'ok',
    timestamp: new Date()
  });
});

const PORT = process.env.PORT || 3001;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('✅ Banco sincronizado.');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('❌ Erro ao conectar ao banco:', err);
  });