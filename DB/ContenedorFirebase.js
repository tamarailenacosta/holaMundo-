//Firebase Cloud 
const admin = require("firebase-admin");

const serviceAccount = require("./proyecto-7-ed492-firebase-adminsdk-5wqoo-d61beb0145.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


class ContenedorFirebase {

    constructor() {

        this.db = admin.firestore()
        this.query = this.db.collection('carrito')
        console.log('Base Firebase conectada!')
    }

    //a. POST: '/' - Crea un carrito y devuelve su id.
    async save(data) {
        try {
            const doc = await this.query.doc('324234324').set(data);
            return doc;
        } catch (error) {
            console.log("Hubo un error obteniendo todos los items: ", error);
        }
    }

    //b. DELETE: '/:id' - Vacía un carrito y lo elimina.
    async deleteById(idCart) {
        try {
            const res = await this.query.doc(idCart).delete();
            return res
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }


    //c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito 
    async getById(id) {
        try {
            const carrito = await this.query.doc(id).get();
            return carrito.data();
        } catch (error) {
            console.log("Hubo un error obteniendo un item: ", error);
        }
    }

    //d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de carrito ( o de producto?) 
    async saveProduct(idCart, body) {
        try {
            const doc = await this.query.doc(idCart).set(body);
            return doc;
        } catch (error) {
            console.log("Hubo un error obteniendo todos los items: ", error);
        }
    }


    //e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
    async deleteProductById(idCart, idProd) {
        try {
            const doc = await this.query.doc(idCart).delete();
            return doc;
        } catch (error) {
            console.log("Hubo un error no se pudo eliminar : ", error);
        }
    }


    async desconectar() {}
}

module.exports = { ContenedorFirebase }