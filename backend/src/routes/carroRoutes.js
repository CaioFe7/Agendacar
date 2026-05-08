const { Router } = require('express');
const ctrl = require('../controllers/carroController');
const auth = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/auth');

const router = Router();
router.get('/', ctrl.listar);
router.get('/:id', ctrl.buscarPorId);
router.post('/', auth, isAdmin, ctrl.criar);
router.put('/:id', auth, isAdmin, ctrl.atualizar);
router.delete('/:id', auth, isAdmin, ctrl.deletar);

module.exports = router;
