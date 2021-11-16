//El router base '/api/carrito' 

const { Router } = require('express')

const routerCart = Router()

const { cartModel } = require('../models/cartModel')

const data = new cartModel('../cart.txt')



//a. POST: '/' - Crea un carrito y devuelve su id. 
routerCart.post('/', async(re, resp) => {
    try {
        const idCart = await data.save()
        resp.json(`El carrito id: ${idCart} se genero con exito`)
    } catch (err) {
        resp.json(`Hubo un erro no se pudo generar el carrito`)
        throw err
    }
})


//b. DELETE: '/:id' - Vacía un carrito y lo elimina. 
routerCart.delete('/:id', async(req, resp) => {
    let check = false
    const id = number(req.params.id)
    try {
        check = await data.delete()
        if (check) {
            resp.json(`El carrito id: ${id} fue eliminado`)
        } else
            resp.json(`El carrito id: ${id} NO se pudo eliminar`)
    } catch (err) {
        throw err
    }
})

//c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito 
routerCart.get('/:id/productos', async(re, resp) => {
    try {
        const all = await data.getAll()
        resp.json(all)

    } catch (err) {
        throw err
    }
})

//d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto 
routerCart.post('/:id/productos', async(req, resp) => {

    let { precio, title, qty } = req.body
    let idCart = parseInt(req.params.id)
    let newProduct = {
        "title": title,
        "price": price,
        "qty": qty
    }

    try {
        let id = await data.save(newProduct)
            //res.redirect('/api/productos')


    } catch (err) {
        throw new Error
    }
})

//e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
routerCart.delete('/:id/productos/:id_prod', async(re, resp) => {
    try {

    } catch (err) {
        throw err
    }
})

module.exports = routerCart