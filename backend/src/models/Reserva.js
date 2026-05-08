const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reserva = sequelize.define('Reserva', {
  dataInicio: { type: DataTypes.DATEONLY, allowNull: false },
  dataFim: { type: DataTypes.DATEONLY, allowNull: false },
  valorTotal: { type: DataTypes.FLOAT, allowNull: false },
  status: {
    type: DataTypes.ENUM('ativa', 'cancelada', 'concluida'),
    defaultValue: 'ativa',
  },
  destino: { type: DataTypes.STRING },
});

module.exports = Reserva;
