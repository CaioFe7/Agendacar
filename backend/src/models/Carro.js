const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carro = sequelize.define('Carro', {
  nome: { type: DataTypes.STRING, allowNull: false },
  tipo: { type: DataTypes.STRING, allowNull: false },
  imagem: { type: DataTypes.STRING },
  capacidade: { type: DataTypes.INTEGER, allowNull: false },
  transmissao: { type: DataTypes.STRING, allowNull: false },
  tanque: { type: DataTypes.INTEGER, allowNull: false },
  precoDia: { type: DataTypes.FLOAT, allowNull: false },
  disponivel: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Carro;
