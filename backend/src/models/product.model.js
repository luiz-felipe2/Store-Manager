const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [response] = await connection.execute('SELECT * FROM products ORDER BY id');
  return camelize(response);
};

const findById = async (id) => {
  const [response] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return response;
};

const newProduct = async (product) => {
  const [response] = await connection.execute('INSERT INTO products (name) VALUES (?)', [product]);
  return { id: response.insertId, product };
};

module.exports = {
  findAll,
  findById,
  newProduct,
};