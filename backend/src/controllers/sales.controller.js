const { salesService } = require('../services');
const { mapStatus } = require('../utils/mapStatus');

const findAllSale = async (_req, res) => {
  const { status, data } = await salesService.findAllSale();
  return res.status(mapStatus(status)).json(data);
};

const findByIdSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findByIdSale(id);
  return res.status(mapStatus(status)).json(data);
};

const newSale = async (req, res) => {
  const saleItems = req.body;
  const { status, data } = await salesService.newSale(saleItems);
  return res.status(mapStatus(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.deleteSale(id);
  if (status === 'NOT_FOUND') return res.status(mapStatus(status)).json(data);
  if (status === 'DELETED') return res.status(mapStatus(status)).json();
};

module.exports = {
  findAllSale,
  findByIdSale,
  newSale,
  deleteSale,
};