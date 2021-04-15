const express = require('express');
const { verifyJWT } = require('./utils/functionsJWS');

const routes = express.Router();

const ClientController = require('./Controllers/ClientController');

routes.post('/clients/create', verifyJWT, ClientController.create);
routes.get('/clients/:id', verifyJWT, ClientController.access);
routes.put('/clients/update/:id', verifyJWT, ClientController.update);
routes.put('/clients/toggleStatus/:id', verifyJWT, ClientController.toggleStatus);
routes.get('/clients', verifyJWT, ClientController.accessList);

module.exports = routes;