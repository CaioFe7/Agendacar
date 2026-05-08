const Usuario = require('./Usuario');
const Carro = require('./Carro');
const Reserva = require('./Reserva');

// Relacionamentos Sequelize
Usuario.hasMany(Reserva, { onDelete: 'CASCADE' });
Reserva.belongsTo(Usuario);

Carro.hasMany(Reserva, { onDelete: 'CASCADE' });
Reserva.belongsTo(Carro);

module.exports = { Usuario, Carro, Reserva };
