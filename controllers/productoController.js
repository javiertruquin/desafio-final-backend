const Producto = require("../models/Producto");
const { validationResult } = require("express-validator");

exports.crearProducto = async (req, res) => {
    // revisamos los errores
    
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }
    
    let { body } = req;
    let { codigo , titulo } = body;
    
    console.log('entro');
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

exports.deleteProducto = async (req, res) => {
    try {
        const { body } = req;
        console.log('body', body)
        // const { id } = req.params;
        const producto = await Producto.findOne(body);
        // if (!producto.creator.equals(usuario.id)) {
        //     return res.status(403).json({ msg: 'no tiene permitido eliminar este meme' });
        // }
        await producto.delete();
        res.send({ msg: 'Producto eliminado' });
    } catch (error) {
        res.status(400).json({ msg: 'error al eliminar el producto' });
        console.log('🚀 - error', error);
    }
};

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.send(productos);
        console.log("funcion obtener productos");
    } catch (error) {
        res.status(400).json({ msg: 'error al obtener los productos' });
        console.log('🚀 - error', error);
    }
};

exports.editarProducto = async (req, res) => {
    try {
        const { body } = req;
        console.log('entro', body)
        // console.log('req', body.id)
        const actualizacionProducto = await Producto.findOneAndUpdate({codigo: body.codigo}, body, { new: true });
        res.send(actualizacionProducto);
    } catch (error) {
        res.status(400).send({ msg: 'Hubo un error al actualizar el producto'});
    }
};