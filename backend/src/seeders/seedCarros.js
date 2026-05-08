require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const sequelize = require('../config/database');
require('../models');
const { Carro } = require('../models');

const carros = [
  {
    nome: 'Porsche 911',
    tipo: 'Sport',
    imagem: '/img/porsche.png',
    capacidade: 2,
    transmissao: 'Automático',
    tanque: 64,
    precoDia: 3500,
    disponivel: true,
  },
  {
    nome: 'T-Cross',
    tipo: 'SUV',
    imagem: '/img/comprar-sense-200-tsi-automatica_5b696e8da4.png',
    capacidade: 5,
    transmissao: 'Automático',
    tanque: 52,
    precoDia: 200,
    disponivel: true,
  },
  {
    nome: 'Civic Type-R',
    tipo: 'Sport',
    imagem: '/img/C462088_GA_Side.avif',
    capacidade: 4,
    transmissao: 'Manual',
    tanque: 47,
    precoDia: 3500,
    disponivel: true,
  },
  {
    nome: 'Silverado',
    tipo: 'Picape',
    imagem: '/img/2024-Silverado-EV-hero.avif',
    capacidade: 5,
    transmissao: 'Automático',
    tanque: 91,
    precoDia: 800,
    disponivel: true,
  },
];

(async () => {
  try {
    await sequelize.sync({ alter: true });

    let inseridos = 0;
    let atualizados = 0;

    for (const carroData of carros) {
      const [carro, created] = await Carro.findOrCreate({
        where: { nome: carroData.nome },
        defaults: carroData,
      });
      if (!created) {
        await carro.update(carroData);
        atualizados++;
      } else {
        inseridos++;
      }
    }

    console.log(`✅ Carros: ${inseridos} inseridos, ${atualizados} atualizados.`);
    console.log('   Frota: Porsche 911 · T-Cross · Civic Type-R · Silverado');
  } catch (err) {
    console.error('❌ Erro no seed de carros:', err.message);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
})();
