const { salesModel, productModel } = require('../models');

const findAllSale = async () => {
  const response = await salesModel.findAllSale();
  if (response.length === 0) {
 return { status: 'NOT_FOUND',
data: {
message: 'Sale not found' } }; 
} 
  
  return { status: 'SUCCESSFUL', data: response };
};

const findByIdSale = async (id) => {
  const response = await salesModel.findByIdSale(id);
  if (response.length === 0) {
 return { status: 'NOT_FOUND',
data: { 
message: 'Sale not found' } }; 
} 
  return { status: 'SUCCESSFUL', data: response };
};

const someProductNotExists = async (saleItems) => {
  const promises = saleItems.map(async (item) => productModel.findById(item.productId));
  const response = await Promise.all(promises);
  const productNotExists = response.some((item) => item.length === 0);
  return productNotExists;
};

const newSale = async (saleItems) => {
  if (await someProductNotExists(saleItems)) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  const response = await salesModel.newSale(saleItems);
  return { status: 'CREATED', data: response };
};

module.exports = {
  findAllSale,
  findByIdSale,
  newSale,
};