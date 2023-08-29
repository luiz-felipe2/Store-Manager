const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateFields } = require('../middlewares/sales.middllewares');

route.get('/', salesController.findAllSale);
route.get('/:id', salesController.findByIdSale);

route.post('/', validateFields, salesController.newSale);

module.exports = route;