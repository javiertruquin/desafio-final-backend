const mongoose = require("mongoose");
const ProductosSchema = mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    titulo: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        trim: true,
    },
    categoria: {
        type: String,
        trim: true,
    },
    foto: {
        type: String,
        trim: true,
    },
    registro: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Producto", ProductosSchema);