// Rutas para crear usuarios
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const usuarioValidation = require('../validations/usuarioValidation');
// Crear un usuario
// api/usuarios
router.post('/', usuarioValidation.crearUsuario, usuarioController.crearUsuario);

module.exports = router;
