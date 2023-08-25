const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.findAllSale);

route.get('/:id', salesController.findByIdSale);

module.exports = route;