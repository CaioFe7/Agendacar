const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

async function cadastrar(req, res) {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }
    const hash = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({ nome, email, senha: hash });
    return res.status(201).json({ msg: 'Usuário cadastrado!', id: usuario.id });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ erro: 'Email já cadastrado.' });
    }
    return res.status(500).json({ erro: 'Erro interno.' });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas.' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: 'Credenciais inválidas.' });

    // Gera JWT com id, nome e email para uso no frontend
    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return res.json({ token, nome: usuario.nome, role: usuario.role });
  } catch {
    return res.status(500).json({ erro: 'Erro interno.' });
  }
}

module.exports = { cadastrar, login };
