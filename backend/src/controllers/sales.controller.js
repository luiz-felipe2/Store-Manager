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
  const saleItens = req.body;
  const { status, data } = await salesService.newSale(saleItens);
  return res.status(mapStatus(status)).json(data);
};

module.exports = {
  findAllSale,
  findByIdSale,
  newSale,
};