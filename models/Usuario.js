const mongoose = require('mongoose');
const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    rol: {
        type: String,
        trim: true,
        required: true,
    },
    carrito: [
        {
            producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
            cantidad: { type: Number},
        },
    ],
    favoritos: [
        {
            producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
        },
    ],
    registro: {
        type: Date,
        default: Date.now(),
    },
    habilitado: {
        type: Boolean,
        default: true,
        trim: true,
    },
    titulo: {
        type: String,
        trim: true,
    },
    documento: {
        type: String,
        trim: true,
    },
    telefono: {
        type: Number,
        trim: true,
    },
    domicilio: [
        {
            titulo: { type: String, trim: true, required: true, },
            provincia: { type: String, trim: true, required: true, },
            localidad: { type: String, trim: true, required: true, },
            calle: { type: String, trim: true, required: true, },
            numero: { type: Number, trim: true, required: true, },
            departamento: { type: String, trim: true, },
            indicaciones: { type: String, trim: true, },
            codPostal: { type: Number, trim: true, },
        },
    ]
});

module.exports = mongoose.model('Usuario', UsuariosSchema);
