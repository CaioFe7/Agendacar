const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// SQLite para desenvolvimento local (sem necessidade de servidor)
// Para usar MySQL em produção, basta mudar DB_DIALECT=mysql no .env
const dialect = process.env.DB_DIALECT || 'sqlite';

let sequelize;

if (dialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../agendacar.db'),
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect,
      logging: false,
    }
  );
}

module.exports = sequelize;
