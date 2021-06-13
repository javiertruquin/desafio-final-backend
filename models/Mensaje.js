const mongoose = require('mongoose');
const MensajeSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    mensaje: {
        type: String,
        required: true,
        trim: true,
    },
    estado: {
        type: String,
        required: true,
        trim: true,
    },
    fecha: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Mensaje', MensajeSchema);
