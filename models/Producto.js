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
        type: Array,
        required: true,
        trim: true,
    },
    categoria: {
        type: String,
        required: true,
        trim: true,
    },
    serie: {
        type: String,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        trim: true,
    },
    precio: {
        type: Number,
        required: true,
        trim: true,
    },
    image1: {
        type: String,
        required: true,
        trim: true,
    },
    image2: {
        type: String,
        required: true,
        trim: true,
    },
    image3: {
        type: String,
        required: true,
        trim: true,
    },
    image4: {
        type: String,
        trim: true,
    },
    image5: {
        type: String,
        trim: true,
    },
    image6: {
        type: String,
        trim: true,
    },
    registro: {
        type: Date,
        default: Date.now(),
    },
    creator: {
        type: String,
        trim: true,
        required: true,
    }
});

module.exports = mongoose.model("Producto", ProductosSchema);