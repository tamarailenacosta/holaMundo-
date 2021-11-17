// router base 'api/productos/'

const { Router, response, urlencoded } = require('express')

const routerProducts = Router()

const { ProductsModels } = require('../../models/productsModel');
const { isAdmin } = require('../Admin')


const data = new ProductsModels('../productos.txt')


//a. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id
//(disponible para usuarios y administradores) 
routerProducts.get('/:id?', async(req, res) => {
    try {
        const id = req.params.id
        const product = await data.getById(id)
        res.json(product)
    } catch (error) {
        res.send(error)
    }

})




//b. POST: '/' -Para incorporar productos al listado (disponible para administradores) 

//estructura del producto
//this.nombre = 'xxxx'
//this.description = descripcion
//this.codigo = codigo
//this.foto = url
//this.precio = 0
//this.stock = 0

//ESTO ESTA TIRANDO UNHANDLED PROMISE REVISARLO//
routerProducts.post('/', isAdmin, async(req, res) => {
    let { title, price, stock, descripcion, codigo, url } = req.body
    let newProduct = {
        "title": title,
        "price": price,
        "descripcion": descripcion,
        "codigo": codigo,
        "foto": url,
        "stock": stock

    }
    console.log(newProduct)
    try {
        let id = await data.save(newProduct)
        send.json(`el prodcuto ${id} fue guardado con éxito`)
    } catch (err) {
        throw new Error
        send.json('error en guardar el archivo')
    }
})



//c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores) 

routerProducts.put("/:id", isAdmin, async(req, res) => {
    const updateProduct = req.body;
    const id = Number(req.params.id);
    updateProduct.id = id;
    const updating = await data.update(id, updateProduct);
    if (updating === null) return res.send({ error: "cannot find product" });
    res.send({
        message: "product updated"
    });
});

//d. DELETE: '/:id' - Borra un producto por su id (disponible para administradores) 

routerProducts.delete('/:id', isAdmin, async(req, res) => {
    try {
        const id = req.params.id
        const product = await data.deleteById(id)
        if (!product) {
            res.json("producto no encontrado")
        }
        res.json(`el producto ${id} fue eliminanod con éxito!`)
    } catch (error) {
        throw error
    }
})



module.exports = routerProducts