const dat = '2023-08-24T16:52:39.000Z';

const allSales = [
    {
      date: dat,
      productId: 1,
      quantity: 5,
    },
    {
      date: dat,
      saleId: 1,
      productId: 2,
      quantity: 10,
    },
    {
      date: dat,
      saleId: 2,
      productId: 3,
      quantity: 15,
    },
    {
      date: dat,
      saleId: 3,
      productId: 1,
      quantity: 1,
    },
    {
      date: dat,
      saleId: 3,
      productId: 2,
      quantity: 5,
    },
  ];

  const saleById = [
    {
      date: '2021-09-09T04:54:29.000Z',
      productId: 1,
      quantity: 2,
    },
    {
      date: '2021-09-09T04:54:54.000Z',
      productId: 2,
      quantity: 2,
    },
  ];

  module.exports = {
    allSales,
    saleById,
  };