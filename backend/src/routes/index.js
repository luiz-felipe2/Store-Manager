const router = require('express').Router();
const productRouter = require('./product.routes');
const salesRouter = require('./sales.routes');

router.use('/products', productRouter);
router.use('/sales', salesRouter);
// outras rotas ficarão aqui

module.exports = router;