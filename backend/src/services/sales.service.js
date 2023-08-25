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

module.exports = {
  findAllSale,
  findByIdSale,
};