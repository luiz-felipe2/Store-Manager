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

const newProduct = async (name) => {
  const [response] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);
  return { id: response.insertId, name };
};

const updateProduct = async (id, name) => {
  await connection.execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  return { id: Number(id), name };
};

module.exports = {
  findAll,
  findById,
  newProduct,
  updateProduct,
};