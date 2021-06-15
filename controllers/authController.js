const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');

exports.register = async (req, res) => {
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

        // Crear y firmar JWT
        const payload = {
            usuario: {
                id: usuario.id,
            },
        };

        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: '365d', //1 hora
            },
            (error, token) => {
                if (error) throw error;
                // Enviar token al usuario.
                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error al crear el Usuario');
    }
};

exports.login = async (req, res) => {
    // revisamos los errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }
    const { email, password } = req.body;

    try {
        //Revisar usuario registrado
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El Usuario no existe' });
        }
        //Revisar el password
        const passCorrect = await bcryptjs.compare(password, usuario.password);
        if (!passCorrect) {
            return res.status(400).json({ msg: 'Password incorrecto' });
        }
        const usuarioRol = usuario.rol;
        // Si todo es correcto Crear y firmar JWT
        const payload = {
            usuario: {
                id: usuario.id,
            },
        };
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 3600, //1 hora
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token , usuarioRol });
            }
        );
    } catch (error) {
        console.log('~ error', error);
    }
};

exports.editarUsuario = async (req, res) => {
    try {
        const { body } = req;
        console.log('entro', body)

        const salt = await bcryptjs.genSalt(10);
        body.password = await bcryptjs.hash(body.password, salt);

        // console.log('req', body.id)
        const actualizacionUsuario = await Usuario.findByIdAndUpdate( body.id, body, { new: true });
        res.send(actualizacionUsuario);
    } catch (error) {
        res.status(400).send({ msg: 'Hubo un error al actualizar el usuario'});
    }
};

exports.deleteUsuario = async (req, res) => {
    try {
        const { body } = req;
        // console.log('body', body)
        // const { id } = req.params;
        const usuario = await Usuario.findOne(body);
        // if (!producto.creator.equals(usuario.id)) {
        //     return res.status(403).json({ msg: 'no tiene permitido eliminar este meme' });
        // }
        await usuario.delete();
        res.send({ msg: 'Usuario eliminado' });
    } catch (error) {
        res.status(400).json({ msg: 'error al eliminar el producto' });
        console.log('🚀 - error', error);
    }
};

exports.getUser = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario.id).select('-password -__v').populate("carrito.producto");
    res.send(usuario);
};

exports.getUserComplete = async (req, res) => {
    const usuario = await Usuario.findById(req.usuario.id).select('-password -__v');
    res.send(usuario);
};

exports.getUsersFilter = async (req, res) => {
    const usuarios = await Usuario.find(req.query).select('-password -__v');
    res.send(usuarios);
};

exports.getUsers = async (req, res) => {
    const usuarios = await Usuario.find().select('-password -__v');
    res.send(usuarios);
};