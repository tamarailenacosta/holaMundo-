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

    getById = async(idCart) => {
        try {
            const cart = await this.getAll()
            const mycart = cart.find(p => p.id === idCart)
            if (mycart === undefined) {
                return null;
            }
            return mycart

        } catch (err) {
            console.log('error de lectura de achivo cart')
            throw err

        }

    }

    //saveById 
    save = async() => {

        try {
            const all = await this.getAll()
            let cart = {}
            cart.id = all.length + 1
            cart.timestamp = Date.now()
            cart.productos = {}
            all.push(cart)
            console.log(all)
            fs.promises.writeFile(this.ruta, JSON.stringify(all))
            return cart.id
        } catch (err) {
            console.log("error al escribir el archivo cart.txt")
            throw err
        }

    }

    addProduct = async(product, ID) => {

        try {
            const cart = await this.getAll()
            let idcart = parseInt(ID)
            const mycart = cart.find(p => p.id === idcart)
            console.log(mycart)
            if (mycart === undefined) {
                return null;
            }
            mycart.productos = product
                // aca tengo que remplazar el cart 2 por un nuevo cart, sino se duplica
            cart.push(mycart)
            console.log(cart)
            await fs.promises.writeFile(this.ruta, JSON.stringify(cart))
            return true
        } catch (err) {
            console.log("error al escribir el archivo cart.txt")
            throw err
        }

    }


    deleteProduct = async(idProd, myCart) => {

        try {
            const found = myCart.forEach(element => console.log(element))
                /*cart.push(mycart)
                console.log(cart)
                await fs.promises.writeFile(this.ruta, JSON.stringify(cart))
                return true*/
        } catch (err) {
            console.log("error al escribir el archivo cart.txt")
            throw err
        }

    }

    //deleteById 
    delete = async(ID) => {
        let id = ID
        try {
            const all = await this.getAll();
            const found = all.find(c => c.id === id)
            if (found === undefined) {
                return false
            }
            const filtered = all.filter(c => c.id !== id)
            await fs.promises.writeFile(this.ruta, JSON.stringify(filtered, null, 2))
            return true
        } catch (err) {
            throw err
        }

    }


}




module.exports = { CartModel }