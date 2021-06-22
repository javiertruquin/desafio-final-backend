const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const usuarioValidation = require('../validations/usuarioValidation');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/register', usuarioValidation.crearUsuario, authController.register);
router.post(
    '/login',
    [
        check('email', 'Agrega un Email Valido').isEmail(),
        check('password', 'El password debe tener mínimo de 6 caracteres').isLength({ min: 6 }),
    ],
    authController.login
);
router.put('/', authMiddleware, authController.editarUsuario);
router.put('/', authMiddleware, authController.editarDomicilio);
router.put('/domicilio', authMiddleware, authController.editarDomicilio);
router.put('/password', authMiddleware, authController.editarContraseña);
router.put('/admin', adminMiddleware, authController.editarUsuarioAdmin);
router.delete("/:id", adminMiddleware, authController.deleteUsuario);
router.get('/', authMiddleware, authController.getUser);
router.get('/favoritos', authMiddleware, authController.getFavs);
router.get('/complete', authMiddleware, authController.getUserComplete);
router.get('/usuariosFilter', adminMiddleware, authController.getUsersFilter);
router.get('/usuariosAdmin', adminMiddleware, authController.getUsers);

module.exports = router;
