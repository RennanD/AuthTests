const routes = require('express').Router()

const UserController = require('./controllers/UserController')

routes.post('/session',UserController.store)

module.exports = routes