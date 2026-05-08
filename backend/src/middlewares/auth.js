const jwt = require('jsonwebtoken');

// Verifica o JWT no header Authorization: Bearer <token>
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido.' });

  const [, token] = authHeader.split(' ');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}

function isAdmin(req, res, next) {
  if (req.usuario?.role !== 'admin') {
    return res.status(403).json({ erro: 'Acesso negado: apenas administradores.' });
  }
  next();
}

module.exports = auth;
module.exports.isAdmin = isAdmin;
