const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.crearUsuario = async (req, res) => {
    // revisamos los errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }

    let { email, password } = req.body;

    try {
        let usuarioEncontrado = await Usuario.findOne({ email });
        if (usuarioEncontrado) {
            return res.status(400).send('Email ya esta en uso');
        }

        //nuevo usuario
        let usuario = new Usuario(req.body);

        //hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //guardar usuario
        await usuario.save();

        //mensaje de exito
        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error al crear el Usuario');
    }
};

exports.obtenerUsuarios = (req, res) => {
    console.log('función obtener usuarios');
};

exports.modificarCarrito = async (req, res) => {
    try {
        const { itemCarrito } = req.body;
        const usuario = await Usuario.findById({ _id: req.usuario.id });
        const foundCartItem = usuario.carrito.find((item) => {
            return item.producto.equals(itemCarrito.producto);
        });
        if (foundCartItem) {
            foundCartItem.cantidad = itemCarrito.cantidad;
        } else {
            usuario.carrito.push(itemCarrito);
        }
        await usuario.save();
        res.send(usuario);
    } catch (error) {
        console.log('exports.modificarUsuario= ~ error', error);
    }
};
exports.resetearCarrito = async (req, res) => {
    try {
        // const { id } = req.body;
        const usuario = await Usuario.findById({ _id: req.usuario.id });
        usuario.carrito = [];
        await usuario.save();
        res.send(usuario);
    } catch (error) {
        console.log('exports.modificarUsuario= ~ error', error);
    }
};
exports.modificarFavorito = async (req, res) => {
    try {
        const { itemFavorito } = req.body;
        const usuario = await Usuario.findById({ _id: req.usuario.id });
        const foundFavItem = usuario.favoritos.find((item) => {
            return item.producto.equals(itemFavorito.producto);
        });
            if (foundFavItem) {
                const nuevosFavoritos = [];
                for (let i = 0; i < usuario.favoritos.length; i++) {
                    const prodFavorito = usuario.favoritos[i];
                    if ( foundFavItem.producto === prodFavorito.producto ) {
                        // console.log('coincide')
                    } else {
                        nuevosFavoritos.push(prodFavorito);                    
                    }
                }
            usuario.favoritos = nuevosFavoritos;
        } else {
            usuario.favoritos.push(itemFavorito);
        }
        await usuario.save();
        res.send(usuario);
    } catch (error) {
        console.log('Modificar Carrito error', error);
    }
};
exports.obtenerFavoritos = async (req, res) => {
    const { params } = req;
    const usuario = await Usuario.findById({ _id: params.id });
    res.send(usuario.favoritos)    
};

exports.eliminarCarrito = async (req, res) => {
    try {
        const { productoBuscado } = req.body;
        const usuario = await Usuario.findById({ _id: req.usuario.id });
        let nuevoCarrito = [];
        for (let i = 0; i < usuario.carrito.length; i++) {
            const element = usuario.carrito[i];
            if (element.producto != productoBuscado) {
                nuevoCarrito.push(element);
            }
        }
        usuario.carrito = nuevoCarrito;
        await usuario.save();
        res.send(usuario);
    } catch (error) {
        console.log('exports.eliminarCarrito= ~ error', error);
    }
};

exports.cantidadCarrito = async (req, res) => {
    try {
        const { productoBuscado , cantidadNueva } = req.body;
        const usuario = await Usuario.findById({ _id: req.usuario.id });
        let nuevoCarrito=[];
        for (let i = 0; i < usuario.carrito.length; i++) {
            const element = usuario.carrito[i];
            if (element.producto == productoBuscado) {
                const id = element._id;
                const idProducto = element.producto
                nuevoCarrito.push({ cantidad: cantidadNueva ,producto : idProducto , _id: id});
            }else{
                nuevoCarrito.push(element);
            }
        }
        usuario.carrito = nuevoCarrito;
        await usuario.save();
        res.send(usuario);
    } catch (error) {
        console.log('exports.cantidadCarrito= ~ error', error);
    }
};
