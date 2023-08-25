const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesModel } = require('../../../src/models/index');
const { allSales } = require('../../mocks/sales.mocks');
const connection = require('../../../src/models/connection');

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
});