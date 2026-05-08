const { Reserva, Carro } = require('../models');

async function listar(req, res) {
  const reservas = await Reserva.findAll({
    where: { UsuarioId: req.usuario.id },
    include: [{ model: Carro, attributes: ['nome', 'tipo', 'imagem', 'precoDia'] }],
    order: [['createdAt', 'DESC']],
  });
  res.json(reservas);
}

async function buscarPorId(req, res) {
  const reserva = await Reserva.findOne({
    where: { id: req.params.id, UsuarioId: req.usuario.id },
    include: [Carro],
  });
  if (!reserva) return res.status(404).json({ erro: 'Reserva não encontrada.' });
  res.json(reserva);
}

async function criar(req, res) {
  try {
    const { CarroId, dataInicio, dataFim, destino } = req.body;
    const carro = await Carro.findByPk(CarroId);
    if (!carro || !carro.disponivel) {
      return res.status(400).json({ erro: 'Carro indisponível.' });
    }
    const dias = Math.ceil(
      (new Date(dataFim) - new Date(dataInicio)) / (1000 * 60 * 60 * 24)
    );
    if (dias < 1) return res.status(400).json({ erro: 'Datas inválidas.' });

    const valorTotal = dias * carro.precoDia;
    const reserva = await Reserva.create({
      CarroId,
      UsuarioId: req.usuario.id,
      dataInicio,
      dataFim,
      valorTotal,
      destino,
    });
    res.status(201).json(reserva);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

async function atualizar(req, res) {
  const reserva = await Reserva.findOne({
    where: { id: req.params.id, UsuarioId: req.usuario.id },
  });
  if (!reserva) return res.status(404).json({ erro: 'Reserva não encontrada.' });
  await reserva.update(req.body);
  res.json(reserva);
}

async function cancelar(req, res) {
  const reserva = await Reserva.findOne({
    where: { id: req.params.id, UsuarioId: req.usuario.id },
  });
  if (!reserva) return res.status(404).json({ erro: 'Reserva não encontrada.' });
  await reserva.update({ status: 'cancelada' });
  res.json({ msg: 'Reserva cancelada.' });
}

module.exports = { listar, buscarPorId, criar, atualizar, cancelar };
