const route = require('express').Router();
const { productController } = require('../controllers');
const { validateName } = require('../middlewares/products.middllewares');

route.get('/', productController.findAll);
route.get('/:id', productController.findById);
route.post('/', validateName, productController.newProduct);
route.delete('/:id', productController.deleteProduct);

module.exports = route;