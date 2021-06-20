const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const { check } = require('express-validator');

router.post(
    '/',
    [check('domicilio', 'El domicilio es obligatorio').not().isEmpty()],
    ventaController.obtenerVenta
);

router.get('/', ventaController.getVentas);

module.exports = router;
