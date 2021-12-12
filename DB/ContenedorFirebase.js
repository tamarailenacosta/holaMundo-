//Firebase Cloud 
const admin = require("firebase-admin");

const serviceAccount = require("../../DB/proyecto-7-ed492-firebase-adminsdk-5wqoo-d61beb0145.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


class ContenedorFirebase {

    constructor() {

        this.db = admin.firestore()
        this.coleccionCarrito = this.db.collection('carrito')
        console.log('Base Firebase conectada!')
    }

    async getById(id) {
        try {
            const doc = await this.query.doc(id).get();
            return doc.data();
        } catch (error) {
            console.log("Hubo un error obteniendo un item: ", error);
        }
    }

    //c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito 
    async getAll() {
        try {
            const snapshot = await this.query.get();
            return snapshot.docs.map(doc => doc.data());
        } catch (error) {
            console.log("Hubo un error obteniendo todos los items: ", error);
        }
    }

    //a. POST: '/' - Crea un carrito y devuelve su id.
    async save(data) {

        const doc = await this.coleccionCarrito.doc('new-city-id').set(data);
        console.log(doc)
    }


    //c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores) 
    async update(nuevoElem) {

    }

    //e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
    async deleteById(id) {

    }

    //b. DELETE: '/:id' - Vacía un carrito y lo elimina.
    async deleteAll() {
        // version fea e ineficiente pero entendible para empezar
        try {
            const docs = await this.listarAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.borrar(id))
            const resultados = await Promise.allSettled(promesas)
            const errores = resultados.filter(r => r.status == 'rejected')
            if (errores.length > 0) {
                throw new Error('no se borró todo. volver a intentarlo')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async desconectar() {}
}

module.exports = ContenedorFirebase