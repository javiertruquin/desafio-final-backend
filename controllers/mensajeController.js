const Mensaje = require('../models/Mensaje');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.obtenerMensaje = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }
    try {
        //nuevo mensaje
        let mensaje = new Mensaje(req.body);

        //guardar mensaje
        await mensaje.save();

        //mensaje de exito
        res.send('Mensaje enviado');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error al enviar el mensaje');
    }
};

exports.getMensajes = async (req, res) => {
    const mensajes = await Mensaje.find();
    res.send(mensajes);
};

exports.deleteMensaje = async (req, res) => {
    try {
        const { _id } = req.query;
        await Mensaje.findByIdAndDelete(_id);
        res.send({ msg: 'Mensaje eliminado' });
    } catch (error) {
        res.status(400).json({ msg: 'error al eliminar mensaje' });
        console.log('🚀 - error', error);
    }
};
