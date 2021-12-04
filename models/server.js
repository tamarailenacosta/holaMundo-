const express = require('express');

//router
const routerProducts = require('../src/routers/products');
const routerCart = require('../src/routers/cart');

//DB
const { MongoConnection } = require('../daos/config')




class Server {


    constructor() {

        this.port = 8080
        this.app = express()

        // function
        this.starting()
            //this.dbconecction()
        this.middleware()
        this.routing()


    }



    starting = () => {


        const server = this.app.listen(this.port, () =>
            console.log(`Servidor escuchando en el puerto`))
        server.on("error", (error) =>
            console.log(`Error en servidor ${error}`))

    }


    dbconecction = async() => {
        await MongoConnection()
    }

    middleware = () => {

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.static('public'))
        this.app.use(function(err, req, resp, next) {
            console.log(err.stack)
            resp.status(500).send('Error Server')
        })

    }


    routing = () => {

        this.app.use('/api/productos', routerProducts)
        this.app.use('/api/cart', routerCart)

    }


}
module.exports = { Server }