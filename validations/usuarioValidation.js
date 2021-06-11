const { check } = require('express-validator');

exports.crearUsuario = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'Agrega un Email Valido').isEmail(),
    check('password', 'El password debe tener mínimo de 6 caracteres').isLength({ min: 6 }),
    check('rol', 'Ingresa un Rol').not().isEmpty(),
];
