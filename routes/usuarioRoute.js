// Rutas para crear usuarios
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const authMiddleware = require("../middlewares/authMiddleware");
const usuarioValidation = require('../validations/usuarioValidation');
// Crear un usuario
// api/usuarios
router.post('/', usuarioValidation.crearUsuario, usuarioController.crearUsuario);
router.get('/favorito/:id', authMiddleware, usuarioController.obtenerFavoritos);
router.put('/favorito', authMiddleware, usuarioController.modificarFavorito);
router.put('/carrito', authMiddleware, usuarioController.modificarCarrito);
router.put('/carrito/resetear', authMiddleware, usuarioController.resetearCarrito);
router.put('/carrito/cantidad', authMiddleware, usuarioController.cantidadCarrito);
router.put('/carrito/eliminar', authMiddleware, usuarioController.eliminarCarrito);


module.exports = router;
