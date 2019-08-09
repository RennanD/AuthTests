const routes = require('express').Router()
const auth = require('./middlewares/auth')
const UserController = require('./controllers/UserController')

routes.post('/session',UserController.store)

routes.use(auth)
routes.get('/dash', UserController.index)


module.exports = routes