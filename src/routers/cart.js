//El router base '/api/carrito' 

const { Router } = require('express')

const routerCart = Router()

const { CartModel } = require('../../models/cartModel')
const { admin } = require('../Admin')

const data = new CartModel('./cart.txt')



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
    const id = parseInt(req.params.id)
    try {
        check = await data.delete(id)
        if (check) {
            resp.json(`El carrito id: ${id} fue eliminado`)
        } else {
            resp.json(`El carrito id: ${id} NO se encontro`)
        }
    } catch (err) {
        throw err
    }
})

//c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito 
routerCart.get('/:id/productos', async(req, resp) => {
    const idCart = req.params.id
    try {
        const mycart = await data.getById(idCart)
        if (mycart == null) {
            resp.json('no se encontro el carrito')
        }
        resp.json(mycart.productos)

    } catch (err) {
        throw err
    }
})

//d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto 
routerCart.post('/:id/productos', async(req, resp) => {

    const { price, title, qty } = req.body
    const idCart = parseInt(req.params.id)
    const newProduct = {
        "title": title,
        "price": price,
        "qty": qty
    }

    try {
        const saved = await data.addProduct(newProduct, idCart)
        if (!saved) {
            resp.json(`eL ${idCart} no existe`)
        }
        resp.json("el producto se guardo con exito")

    } catch (err) {
        resp.json("no se pudo guardar el producto")
        throw new Error
    }
})

//e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
routerCart.delete('/:id/productos/:id_prod', async(req, resp) => {
    const idCart = parseInt(req.params.id)
    const idProd = parseInt(req.params.id_prod)

    try {
        const mycart = await data.getById(idCart)
        if (mycart !== null) {
            const deleted = await data.deleteProduct(idProd, mycart)
            if (!deleted) {
                resp.json("no se pudo eliminar el producto")
            } else {
                resp.json(mycart.productos, "producto eliminado")
            }

        }
        resp.json('no se encontro el carrito')


    } catch (err) {
        throw err
    }
})

module.exports = routerCart