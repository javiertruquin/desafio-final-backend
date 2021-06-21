const mongoose = require('mongoose');
const { Schema } = mongoose;

const VentaSchema = mongoose.Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    domicilio: [
        {
            provincia: { type: String, trim: true },
            localidad: { type: String, trim: true },
            calle: { type: String, trim: true },
            numero: { type: Number, trim: true },
            piso: { type: String, trim: true },
            telefono: { type: Number, trim: true },
            observaciones: { type: String, trim: true },
        },
    ],
    carrito:[
        {
            producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
            cantidad: { type: Number, default: 1 },
        },
    ],
    total: {
        type: Number,
        trim: true,
    },
    fecha: {
        type: Date,
        default: Date.now(),
        trim: true,
    },
});

module.exports = mongoose.model('Venta', VentaSchema);
