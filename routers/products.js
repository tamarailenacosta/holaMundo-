// router base 'api/productos/'

const { Router } = require('express')

const routerProducts = Router()

const { productsModel } = require('../models/productsModel');

const data = new productsModel('../productos.txt')


//a. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id
//(disponible para usuarios y administradores) 
routerProducts.get('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const product = await data.getById(id)
        res.json(product)
    } catch (error) {
        res.send(error)
    }

})




//b. POST: '/' -Para incorporar productos al listado (disponible para administradores) 

routerProducts.post('/', upload.single('miArchivo'), async(req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    let file = req.file
    let { title, price } = req.body
    let newProduct = {
        "title": title,
        "price": price,
        "image": req.file
    }
    if (!file) {
        let error = new Error('Error subiendo archivo')
        error.httpStatusCode = 400
        throw new Error
    }
    try {
        let id = await data.save(newProduct)
            //res.redirect('/api/productos')


    } catch (err) {
        throw new Error
    }
})



//c. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores) 

routerProducts.put("/:id", async(req, res) => {
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

// revisar que la funcion delete bt id tiene que retoranr objeto no encontrado si no esta el id
routerProducts.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const product = await data.deleteById(id)
        res.json(`el producto ${id} fue eliminanod con éxito!`)
    } catch (error) {
        res.json(error, "producto no encontrado")
    }
})



module.exports = routerProducts