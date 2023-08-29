const { salesModel } = require('../models');

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

const newSale = async (saleItems) => {
 const hasItems = saleItems.map(({ productId }) => salesModel.findByIdSale(productId));
  const hasItems2 = await Promise.all(hasItems);
  const hasItems3 = hasItems2.some((item) => item.length === 0);
  if (hasItems3) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  const id = await salesModel.newSale(saleItems);
  const salesId = await salesModel.findByIdSale(id);
  const itemsSold = salesId.map(({ productId, quantity }) => ({ productId, quantity }));
  return { status: 'CREATED', data: { id, itemsSold } };
 };

module.exports = {
  findAllSale,
  findByIdSale,
  newSale,
};