const fs = require('fs');

class productsModels {

    ////producto: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
    constructor(archivo) {

        this.ruta = archivo
            //this.nombre = 'xxxx'
            //this.description = descripcion
            //this.codigo = codigo
            //this.foto = url
            //this.precio = 0
            //this.stock = 0

    }

    //update un producto a traves del formulario.
    update = async(idProducto, newProduct) => {

        try {
            const productos = await this.getAll()
            const indexId = productos.findIndex(({ id }) => id === idProducto);
            if (indexId === -1) return null;
            productos.splice(indexId, 1, newProduct);
            await fs.promises.writeFile(this.ruta, JSON.stringify(productos, null, 2), "utf-8");
        } catch (error) {
            console.log("Hubo un error: ", error);
        }

    }


    // Recibe un Objeto, lo guarda en el archivo y devuelve el ID asignado,
    // el ID debe ser numerico y debe ser siempre mayor al anterior y no repetirse.
    save = async(producto) => {

        try {

            //leer el archivo y guardo en array.
            const arrayProducts = await this.getAll()
            let nuevoId = arrayProducts.length + 1
            producto.id = nuevoId
            arrayProducts.push(producto)
            fs.promises.writeFile(this.ruta, JSON.stringify(arrayProducts), () => {
                console.log(`Archivo ${this.ruta} escrito con éxito`);
            })
            return nuevoId;
        } catch (error) {
            console.log("Error en guardar el ID", error);
            throw error;

        }


    }



    //Recibe un id y retorna el objeto con ese ID o NULL si no esta.
    getById = async(ID) => {

        const productos = await this.getAll();
        try {
            let id = parseInt(ID)
            const productoId = productos.find(p => p.id === id);
            if (productoId === undefined) {
                return null;
            }
            return productoId;

        } catch (error) {
            console.log("El archivo esta vacio o no pudo ser leido", error);
            throw error;
        }

    }



    // Devuelve un Array con todos los objetos en el archivo.
    getAll = async() => {
        try {
            const allproducts = await fs.promises.readFile(this.ruta, 'utf-8');
            console.log("lectura de archivo exitosa");
            return JSON.parse(allproducts);

        } catch (error) {
            //en caso de que el archivo este vacio
            console.log("Error al leer el archivo", error);
            throw error;



        }
    }




    // Elimina el objeto con el id buscado.
    deleteById = async(ID) => {

        try {
            let id = parseInt(ID)
            const productos = await this.getAll();
            const prods = productos.filter(p => p.id !== id);
            await fs.promises.writeFile(this.ruta, JSON.stringify(prods, null, 2))
        } catch (error) {
            throw error;
        }
    }



    //Elimina todos los objetos presentes en el archivo.
    deleteAll = async() => {
        return await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2));
    }


}


const productos = {
    "name": "Billetera",
    "description": "Billetera de cuero negro",
    "reference": "REF-005",
    "status": "inactive",
    "inventory": {
        "unit": "piece",
        "availableQuantity": 150,
        "unitCost": 560,
        "initialQuantity": 320,
    }

}
module.exports = { productsModels }