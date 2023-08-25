const { productModel } = require('../models');

const findAll = async () => {
  const response = await productModel.findAll();
  return { status: 'SUCCESSFUL', data: response };
};

const findById = async (id) => {
  const [response] = await productModel.findById(id);
  if (!response) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } }; 
  }
  return { status: 'SUCCESSFUL', data: response };
};

const newProduct = async (product) => {
  const response = await productModel.newProduct(product);
  return { status: 'CREATED', data: response };
};

module.exports = {
  findAll,
  findById,
  newProduct,
};
