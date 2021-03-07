const express = require('express')
const routes = express.Router();
require('dotenv-safe').config();

const ClientController = require('./Controllers/ClientController')

routes.post('/clients/create', ClientController.create)
routes.get('/clients/:id', ClientController.access)
routes.put('/clients/update/:id', ClientController.update)
routes.put('/clients/desactivate/:id', ClientController.desactivate)
//routes.get('/clients', ClientController.access_list)

module.exports = routes;