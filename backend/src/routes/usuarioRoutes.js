const { Router } = require('express');
const { cadastrar, login } = require('../controllers/usuarioController');

const router = Router();
router.post('/cadastrar', cadastrar);
router.post('/login', login);

module.exports = router;
