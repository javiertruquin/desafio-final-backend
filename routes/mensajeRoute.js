const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensajeController');

// router.post('/',  mensajeController.);
router.get('/', mensajeController.obtenerMensaje);

module.exports = router;
