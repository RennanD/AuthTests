const express = require('express')

class AppControler {
    constructor(){
        this.express = express()
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.express.use(express.json())
    }

    routes(){
        this.express.use(require('./routes'))        
    }
}

module.exports = new AppControler().express