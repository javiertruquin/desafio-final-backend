const Mensaje = require('../models/Mensaje');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.obtenerMensaje = (req, res) => {
    console.log('función obtener mensajes');
};
