// Rutas para crear usuarios
const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const { check } = require("express-validator");

router.post(
    "/",
    // [
    //     check("codigo", "El código es obligatorio").not().isEmpty(),
    //     check("titulo", "El titulo es obligatorio").not().isEmpty(),
    // ],
    productoController.crearProducto
);

module.exports = router;
