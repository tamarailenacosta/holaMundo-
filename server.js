const express = require('express');

//router
const router = require('./router/productos.js');





class Server {


    constructor() {

        this.port = 8080

        // function
        this.starting()
        this.middleware()
        this.routing()

    }



    starting = () => {


        const server = this.app.listen(this.port, () =>
            console.log(`Servidor escuchando en el puerto`))
        server.on("error", (error) =>
            console.log(`Error en servidor ${error}`))

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

        this.app.use('/api/productos', router)

    }


}
module.exports = { Server }