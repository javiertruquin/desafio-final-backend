const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensajeController');
const { check } = require('express-validator');

// router.post('/',  mensajeController.);
router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un Email Valido').isEmail(),
        check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
    ],
    mensajeController.obtenerMensaje
);

router.get('/', mensajeController.getMensajes);

router.delete('/:mensajeId', mensajeController.deleteMensaje);

module.exports = router;
