const mongoose = require('mongoose');
const VentaSchema = mongoose.Schema({
    usuario: {
        type: String,
        // required: true,
        trim: true,
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
    numeroventa: {
        type: Number,
        trim: true,
        default: 1,
    },
    articulos:[
        {
            producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
            // cantidad: { type: Number, default: 1 },
        },
    ],
    fecha: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Venta', VentaSchema);
