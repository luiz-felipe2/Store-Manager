const route = require('express').Router();
const { productController } = require('../controllers');
const { validateProduct } = require('../middlewares/products.middllewares');

route.get('/', productController.findAll);
route.get('/search', productController.searchProduct);
route.get('/:id', productController.findById);
route.post('/', validateProduct, productController.newProduct);
route.put('/:id', validateProduct, productController.updateProduct);
route.delete('/:id', productController.deleteProduct);

module.exports = route;