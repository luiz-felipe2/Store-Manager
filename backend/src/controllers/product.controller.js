const { productService } = require('../services');
const { mapStatus } = require('../utils/mapStatus');

const findAll = async (_req, res) => {
  const { status, data } = await productService.findAll();
  return res.status(mapStatus(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.findById(id);
  return res.status(mapStatus(status)).json(data);
};

const newProduct = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productService.newProduct(name);
  return res.status(mapStatus(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await productService.updateProduct(id, name);
  return res.status(mapStatus(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.deleteProduct(id);
  if (status === 'NOT_FOUND') {
    return res.status(mapStatus(status)).json(data);
  }
  if (status === 'DELETED') {
    return res.status(mapStatus(status)).json();
  }
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await productService.searchProduct(q);
  return res.status(mapStatus(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  newProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};