const { Router } = require('express');
const ctrl = require('../controllers/reservaController');
const auth = require('../middlewares/auth');

const router = Router();
router.use(auth); // todas as rotas de reserva exigem autenticação JWT

router.get('/', ctrl.listar);
router.get('/:id', ctrl.buscarPorId);
router.post('/', ctrl.criar);
router.put('/:id', ctrl.atualizar);
router.delete('/:id', ctrl.cancelar);

module.exports = router;
