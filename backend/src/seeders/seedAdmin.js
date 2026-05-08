require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const sequelize = require('../config/database');
require('../models');
const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');

(async () => {
  try {
    await sequelize.sync({ alter: true });

    const [admin, created] = await Usuario.findOrCreate({
      where: { email: 'admin@agendacar.com' },
      defaults: {
        nome: 'Administrador',
        senha: await bcrypt.hash('admin123', 10),
        role: 'admin',
      },
    });

    if (created) {
      console.log('✅ Admin criado: admin@agendacar.com / admin123');
    } else {
      // Garante que o usuário existente tem role admin
      await admin.update({ role: 'admin' });
      console.log('✅ Admin já existe (role confirmado): admin@agendacar.com');
    }
  } catch (err) {
    console.error('❌ Erro no seed de admin:', err.message);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
})();
