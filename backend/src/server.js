require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('./models'); // carrega modelos e define os relacionamentos

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

app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date() }));

const PORT = process.env.PORT || 3001;

// alter:true atualiza as tabelas sem apagar dados existentes
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('✅ Banco sincronizado.');
    app.listen(PORT, () =>
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
    );
  })
  .catch(err => console.error('❌ Erro ao conectar ao banco:', err));
