const camelize = require('camelize');
const connection = require('./connection');

const findAllSale = async () => {
  const [response] = await connection.execute(
    `SELECT si.sale_id, s.date, si.product_id, si.quantity
    FROM sales AS s
    INNER JOIN sales_products AS si
    ON s.id = si.sale_id
    ORDER BY sale_id, product_id;`,
  );
  return camelize(response);
};

const findByIdSale = async (id) => {
  const [response] = await connection.execute(
    `SELECT s.date, si.product_id, si.quantity
    FROM sales AS s
    INNER JOIN sales_products AS si
    ON s.id = si.sale_id
    WHERE si.sale_id = ?
    ORDER BY sale_id, product_id;`,
    [id],
  );
  return camelize(response);
};

const newSale = async (saleItems) => {
  const nDate = new Date();
  const [response] = await connection.execute('INSERT INTO sales (date) VALUE(?)', [nDate]);

  const addSales = saleItems.map(({ productId, quantity }) => connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [response.insertId, productId, quantity],
  ));

  await Promise.all(addSales);
  return response.insertId;
};

const deleteSale = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
};

module.exports = {
  findAllSale,
  findByIdSale,
  newSale,
  deleteSale,
};