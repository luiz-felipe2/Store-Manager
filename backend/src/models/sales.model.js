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
  const query = 'INSERT INTO sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.execute(query);
  const queryProducts = `
  INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
  const queryPromises = saleItems.map(({ productId, quantity }) =>
   connection.execute(queryProducts, [insertId, productId, quantity]));

  await Promise.all(queryPromises);

  return camelize({
    id: insertId,
    itemsSold: saleItems,
});
};

module.exports = {
  findAllSale,
  findByIdSale,
  newSale,
};