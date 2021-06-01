const mongoose = require("mongoose");
const ProductosSchema = mongoose.Schema({
    codigoProducto: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    codigoCliente: {
        type: String,
        required: true,
        trim: true,
    },
});

module.exports = mongoose.model("Producto", ProductosSchema);