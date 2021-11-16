//El carrito de compras tendrá la siguiente estructura: id, timestamp(carrito), 
//El timestamp puede implementarse con Date.now()
const fs = require('fs');

class CartModel {

    constructor(archivo) {

        this.ruta = archivo

    }


    //getAll lee del archivo toda la informacion.
    getAll = async() => {
        try {
            const cart = await fs.promises.readFile(this.ruta, 'utf-8')
            console.log('lectura del archivo cart exitosa')
            return JSON.parse(cart)

        } catch (err) {
            console.log('error de lectura de achivo cart')
            throw err

        }

    }

    //saveById 
    save = async() => {

        try {
            const all = await this.getAll()
            cart.id = all.length + 1
            cart.timestamp = Date.now()
            all.push(cart)
            fs.promises.writeFile(this.ruta, JSON.stringify(all))
            return cart.id
        } catch (err) {
            console.log("error al escribir el archivo cart.txt")
            throw err
        }

    }

    //deleteById 
    delete = async(ID) => {
        let id = parseInt(ID)
        try {
            const all = await this.getAll(id);
            const filtered = all.filter(c => c.id !== id);
            await fs.promises.writeFile(this.ruta, JSON.stringify(filtered, null, 2))
            return true
        } catch (err) {
            throw err
        }

    }


}




module.exports = { CartModel }