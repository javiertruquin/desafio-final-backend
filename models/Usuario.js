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
        default:"usuario",
    },
    carrito: [{
        producto: { type: mongoose.Schema.Types.ObjectId,ref:"Producto"},
        cantidad: { type: Number, default: 1 },
    }],
    registro: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Usuario', UsuariosSchema);
