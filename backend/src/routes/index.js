const router = require('express').Router();
const productRouter = require('./product.routes');

router.use('/products', productRouter);
// outras rotas ficarão aqui

module.exports = router;