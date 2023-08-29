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

const newProduct = async (name) => {
  const response = await productModel.newProduct(name);
  return { status: 'CREATED', data: response };
};

const updateProduct = async (id, name) => {
  const [response] = await productModel.findById(id);
  if (!response) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } }; 
  }
  const response2 = await productModel.updateProduct(id, name);
  return { status: 'SUCCESSFUL', data: response2 };
};

const deleteProduct = async (id) => {
  const [response] = await productModel.findById(id);
  if (!response) return { status: 'NOT_FOUND', data: { message: 'Product not found' } }; 
  await productModel.deleteProduct(id);
  return { status: 'DELETED' };
};

const searchProduct = async (name) => {
  if (!name) {
    const response = await productModel.findAll();
    return { status: 'SUCCESSFUL', data: response };
  }
  const response = await productModel.searchProduct(name);
  if (!response) return { status: 'SUCCESSFUL', data: [] };
  return { status: 'SUCCESSFUL', data: response };
};

module.exports = {
  findAll,
  findById,
  newProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
