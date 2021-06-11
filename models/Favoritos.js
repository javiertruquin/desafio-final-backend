const mongoose = require('mongoose');
const ProductosSchema = mongoose.Schema({
    idProducto: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        unique: true,
    },
    idCliente: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
    },
});

module.exports = mongoose.model('Producto', ProductosSchema);
