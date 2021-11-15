//El router base '/api/carrito' 

const { Router } = require('express')

const routerCart = Router()



//a. POST: '/' - Crea un carrito y devuelve su id. 

//b. DELETE: '/:id' - Vacía un carrito y lo elimina. 

//c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito 

//d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto 

//e. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto


module.exports = routerCart