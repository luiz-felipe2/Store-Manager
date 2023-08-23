const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productModel } = require('../../../src/models/index');
const { allProducts } = require('../../mocks/products.mocks');
const connection = require('../../../src/models/connection');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando o model de produtos', function () {
  afterEach(function () {
    sinon.restore(); 
  });

  it('mostrando todos os produtos com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const response = await productModel.findAll();
    expect(response).to.be.deep.equal(allProducts);
  });

  it('mostrando um produto com sucesso', async function () {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([allProducts[0]]);
    const response = await productModel.findById(id);
    expect(response).to.be.deep.equal(allProducts[0]);
  });

  it('mostrando um produto que nao existe', async function () {
    const id = 4;
    sinon.stub(connection, 'execute').resolves([[]]);
    const response = await productModel.findById(id);
    expect(response).to.be.deep.equal([]);
  });
});
