// router base 'api/productos/'
const { Router, response, urlencoded } = require('express')
const routerProducts = Router()

const { ProductsModels } = require('../../models/productsModel');
const Producto = require('../../daos/product')
const { isAdmin } = require('../Admin')

// DAOS
//const { ProductDAO } = require("../DAOS");
//const productDAO = new ProductDAO();

const data = new ProductsModels('../productos.txt')


//a. GET: '/:id?' - Me permite listar un producto por su id
//(disponible para usuarios y administradores) 
routerProducts.get('/:id', async(req, res) => {
    try {
        const { id } = req.params
        const product = await Producto.findById(id)
        res.status(200).json({ product })
    } catch (err) {
        res.status(500).json({ error: err.message });
        throw new Error
    }

})

//Permite listar todos los productos disponibles
//(disponible para usuarios y administradores) 
routerProducts.get('/', async(req, res) => {
    try {
        const product = await Producto.find().limit(5);

        res.status(200).json({ product });
    } catch (err) {
        res.status(500).json({ error: err.message });
        throw new Error
    }

})


//b. POST: '/' -Para incorporar productos al listado (disponible para administradores) 
routerProducts.post('/', isAdmin, async(req, res) => {

    const newProduct = req.body;
    const producto = new Producto(newProduct);
    try {
        await producto.save()
        res.status(200).json({ newProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
        throw new Error
    }

})



//c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores) 

routerProducts.put("/:id", isAdmin, async(req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const udpating = await Producto.findByIdAndUpdate(id, body)
        res.status(200).json({ udpating });
    } catch (err) {
        res.status(500).json({ error: err.message });
        throw new Error
    }
});

//d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores) 

routerProducts.delete('/:id', isAdmin, async(req, res) => {
    try {
        const { id } = req.params
        const product = await Producto.findByIdAndDelete(id)
        res.status(200).json(product, 'eliminado:');
    } catch (err) {
        res.status(500).json({ error: err.message });
        throw new Error
    }
})



module.exports = routerProducts