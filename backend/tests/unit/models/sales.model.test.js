const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesModel } = require('../../../src/models/index');
const { allSales } = require('../../mocks/sales.mocks');
const connection = require('../../../src/models/connection');
const { newSale } = require('../../../src/models/sales.model');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando o model de vendas', function () {
  afterEach(function () {
    sinon.restore(); 
  });

  it('testando a função findAllSale', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    const response = await salesModel.findAllSale();
    expect(response).to.be.deep.equal(allSales);
  });

  it('testando a função findByIdSale', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([allSales[0]]);
    const response = await salesModel.findByIdSale(id);
    expect(response).to.be.deep.equal(allSales[0]);
  });

  it('testando a função findByIdSale com id inexistente', async function () {
    const id = 4;
    sinon.stub(connection, 'execute').resolves([[]]);
    const response = await salesModel.findByIdSale(id);
    expect(response).to.be.deep.equal([]);
  });

  // it('testando a função newSale', async function () {
  //   const id = 1;
  //   const quantity = 2;
  //   const newSales = newSale(id, quantity);
  //   sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
  //   const response = await salesModel.newSale(id, quantity);
  //   await Promise.all(response);
  //   expect(response).to.be.deep.equal(newSales);
  // });
});