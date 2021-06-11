const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');


module.exports = async function (req, res, next) {
    // Leer token
    const token = req.header('x-auth-token');
    // Revisar Token
    if (!token) {
        return res.status(401).json({ msg: 'No hay Token, permiso no valido' });
    }
    
    // Validar Token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        const usuarioEncontrado = await Usuario.findById(req.usuario.id);
        // console.log('usuario encontrado', usuarioEncontrado);
        if (usuarioEncontrado.roll === 'usuario') {
            return res.status(401).json({ msg: 'Permiso no valido' });
        }
        //Continuar al siguiente middleware
        return next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no valido' });
    }
};
