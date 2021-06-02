const Producto = require("../models/Producto");
const { validationResult } = require("express-validator");

exports.crearProducto = async (req, res) => {
    // revisamos los errores
    console.log('lo lee');

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }

    let { body } = req;
    let { codigo , titulo } = body;

    try {
        let productoEncontrado = await Producto.findOne({ codigo });
        if (productoEncontrado) {
            return res.status(400).send("Este codigo está en uso");
        }

        let productoEncontrado2 = await Producto.findOne({ titulo });
        if (productoEncontrado2) {
            return res.status(400).send("Este título ya está en uso");
        }
        //nuevo producto
        // let producto = new Producto(req.body);

        const newProducto = new Producto({ ...body, createdAt: Date.now(), creator: 'usuario.id' });
        await newProducto.save();
        res.send(newProducto);

        //guardar producto
        // await producto.save();

        //mensaje de exito
        res.send("Producto Creado Correctamente");
    } catch (error) {
        console.log(error);
        res.status(400).send("Hubo un error al crear el Producto");
    }
};

exports.obtenerProductos = (req, res) => {
    console.log("funcion obtener prodcutos");
};
