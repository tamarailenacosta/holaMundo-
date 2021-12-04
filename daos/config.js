// getting-started.js
const mongoose = require('mongoose');



const MongoConnection = async() => {

    try {

        await mongoose.connect('mongodb://localhost:27017/test');
        console.log('coneccion exitosa a Base MongoDb');


    } catch (error) {
        console.log(error);
        throw new Error('error en coneeccion MongoDB');
    }

    /* --------------------------------------------------------------------- */
    /*  Definición del esquema de documento y del modelo                     */
    /*  (para poder interactuar con la base de datos: leer, escribir, etc)   */
    /* --------------------------------------------------------------------- */
    const productsSchema = new mongoose.Schema({
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        edad: { type: Number, required: true },
        dni: { type: String, required: true, unique: true },
        curso: { type: String, required: true },
        nota: { type: Number, required: true },
    })

    const EstudiantesDAO = mongoose.model('productos', productsSchema)

};


module.exports = { MongoConnection }