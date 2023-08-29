const route = require('express').Router();
const { productController } = require('../controllers');
const { validateProduct } = require('../middlewares/products.middllewares');

route.get('/', productController.findAll);
route.get('/:id', productController.findById);
route.post('/', validateProduct, productController.newProduct);
route.delete('/:id', productController.deleteProduct);
route.put('/:id', validateProduct, productController.updateProduct);

module.exports = route;