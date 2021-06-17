const mongoose = require('mongoose');
const VentaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
});

module.exports = mongoose.model('Venta', VentaSchema);
