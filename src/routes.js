const express = require('express');

const routes = express.Router();

const ClientController = require('./Controllers/ClientController');

routes.post('/clients/create', ClientController.create);
routes.get('/clients/:id', ClientController.access);
routes.put('/clients/update/:id', ClientController.update);
routes.put('/clients/deactivate/:id', ClientController.deactivate);
routes.get('/clients', ClientController.accessList);

module.exports = routes;
