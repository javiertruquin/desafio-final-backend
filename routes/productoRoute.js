const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post(
    "/", adminMiddleware,
    productoController.crearProducto
);
router.get(
    "/",
    adminMiddleware,
    productoController.obtenerProductos
);
router.get(
"/categoria", 
productoController.obtenerProductosCategoria
);
router.get('/filter', adminMiddleware, productoController.obtenerProductosFiltro);
router.get(
    "/:id", 
    productoController.obtenerProductoIndividual
);
router.put("/", adminMiddleware, productoController.editarProducto);
router.delete("/:id", adminMiddleware, productoController.deleteProducto);

module.exports = router;