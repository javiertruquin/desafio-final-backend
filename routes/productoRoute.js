// Rutas para crear usuarios
const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
// const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
// const { check } = require("express-validator");

router.post(
    "/", adminMiddleware,
    // [ check("codigo", "El código es obligatorio").not().isEmpty(), check("titulo", "El titulo es obligatorio").not().isEmpty(),],
    productoController.crearProducto
);
router.get(
    "/", adminMiddleware,
    // [ check("codigo", "El código es obligatorio").not().isEmpty(), check("titulo", "El titulo es obligatorio").not().isEmpty(),],
    productoController.obtenerProductos
);
router.delete("/", adminMiddleware, productoController.deleteProducto);

module.exports = router;
