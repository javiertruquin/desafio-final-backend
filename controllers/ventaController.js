const Venta = require('../models/Venta');
const Producto = require('../models/Producto');
const { validationResult } = require('express-validator');

exports.obtenerVenta = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }
    req.body.carrito?.map( async (producto) => {
        let produc = await Producto.findById(producto.producto)
        produc.stock = produc.stock - producto.cantidad;
        await produc.save();
    })

    try {
        let venta = new Venta(req.body);
        await venta.save();
        res.send('Mensaje enviado');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error al enviar el mensaje');
    }
};

exports.getVentas = async (req, res) => {
    const ventas = await Venta.find().populate('usuario').populate('carrito.producto');
    res.send(ventas);
};
