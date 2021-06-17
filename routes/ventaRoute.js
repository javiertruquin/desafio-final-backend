const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const { check } = require('express-validator');

router.post('/', [check('nombre', 'El nombre es obligatorio').not().isEmpty()], ventaController.obtenerVenta);

module.exports = router;
