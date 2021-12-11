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


};


module.exports = { MongoConnection }