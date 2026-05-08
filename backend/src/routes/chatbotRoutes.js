const { Router } = require('express');
const { responder } = require('../controllers/chatbotController');

const router = Router();
router.post('/', responder);

module.exports = router;
