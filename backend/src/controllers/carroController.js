const { Carro } = require('../models');

async function listar(req, res) {
  const carros = await Carro.findAll();
  res.json(carros);
}

async function buscarPorId(req, res) {
  const carro = await Carro.findByPk(req.params.id);
  if (!carro) return res.status(404).json({ erro: 'Carro não encontrado.' });
  res.json(carro);
}

async function criar(req, res) {
  try {
    const carro = await Carro.create(req.body);
    res.status(201).json(carro);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

async function atualizar(req, res) {
  const carro = await Carro.findByPk(req.params.id);
  if (!carro) return res.status(404).json({ erro: 'Carro não encontrado.' });
  await carro.update(req.body);
  res.json(carro);
}

async function deletar(req, res) {
  const carro = await Carro.findByPk(req.params.id);
  if (!carro) return res.status(404).json({ erro: 'Carro não encontrado.' });
  await carro.destroy();
  res.json({ msg: 'Carro removido.' });
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar };
