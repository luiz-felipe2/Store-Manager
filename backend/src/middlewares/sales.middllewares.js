const validateProduct = (req, res, next) => {
  const salesItems = req.body;
  const missingProduct = salesItems.some((item) => item.productId === undefined);

  if (missingProduct) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const validateQuantity = (req, res, next) => {
  const salesItems = req.body;
  const missingQuantity = salesItems.some((item) => item.quantity === undefined);

  if (missingQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const validateQuantityValue = (req, res, next) => {
  const salesItems = req.body;
  const invalidQuantity = salesItems.some((item) => item.quantity <= 0);

  if (invalidQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const validateFields = [validateProduct, validateQuantity,
   validateQuantityValue];

module.exports = {
  validateFields,
};