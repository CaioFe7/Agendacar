# AgendaCar — Backend

Node.js + Express + Sequelize (MySQL)

## Estrutura

```
src/
├── config/database.js      # Conexão Sequelize
├── models/
│   ├── index.js            # Relacionamentos (hasMany / belongsTo)
│   ├── Usuario.js
│   ├── Carro.js
│   └── Reserva.js
├── controllers/
│   ├── usuarioController.js
│   ├── carroController.js
│   ├── reservaController.js
│   └── chatbotController.js
├── routes/
│   ├── usuarioRoutes.js
│   ├── carroRoutes.js
│   ├── reservaRoutes.js
│   └── chatbotRoutes.js
├── middlewares/auth.js      # Verificação JWT
├── seeders/seedCarros.js    # Insere os 4 carros originais
├── chatbot/intents.json     # Padrões e respostas do chatbot
└── server.js
```

## Chatbot

Usa o pacote `natural` (Naive Bayes) treinado com intents locais — funciona 100% offline.
Intents disponíveis: `saudacao`, `precos`, `disponibilidade`, `tipos_carro`, `como_reservar`, `cancelar`, `horario`, `despedida`, `fallback`.
