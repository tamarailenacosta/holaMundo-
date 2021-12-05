const { Schema, model } = require('mongoose');

//Un producto dispondrá de los siguientes campos: id, timestamp, nombre,
//descripcion, código, foto (url), precio, stock
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: false,
    },
    photo: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },

});


module.exports = model('Producto', productSchema);