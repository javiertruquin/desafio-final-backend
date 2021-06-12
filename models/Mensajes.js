const mongoose = require('mongoose');
const MensajesSchema = mongoose.Schema({
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
        trim: true,
        required: true,
        default: 'sin leer',
    },
});

module.exports = mongoose.model('Mensaje', MensajesSchema);
