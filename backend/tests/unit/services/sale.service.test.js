const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services/index');
const { salesModel } = require('../../../src/models/index');
const { allSales, saleById } = require('../../mocks/sales.mocks');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando o service de vendas', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('testando se a função retorna todas as vendas', async function () {
    sinon.stub(salesModel, 'findAllSale').resolves(allSales);
    const { status, data } = await salesService.findAllSale();
    expect(status).to.be.deep.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(allSales);
  });

  it('testando se a função retorna o id correto, caso exista', async function () {
    sinon.stub(salesModel, 'findByIdSale').resolves(saleById);
    const { status, data } = await salesService.findByIdSale(1);
    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(saleById);
  });

  it('testando se a função retorna um erro, caso o id não exista', async function () {
    sinon.stub(salesModel, 'findByIdSale').resolves([]);
    const { status, data } = await salesService.findByIdSale(0);
    expect(status).to.be.deep.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('testando se a função retorna um erro, caso não exista nenhuma venda', async function () {
    sinon.stub(salesModel, 'findAllSale').resolves([]);
    const { status, data } = await salesService.findAllSale();
    expect(status).to.be.deep.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('testando se a função retorna um erro, caso algum produto não exista', async function () {
    sinon.stub(salesModel, 'newSale').resolves([]);
    const { status, data } = await salesService.newSale([{ productId: 0, quantity: 1 }]);
    expect(status).to.be.deep.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('testando a função de deletar uma venda', async function () {
    sinon.stub(salesModel, 'findByIdSale').resolves(saleById);
    sinon.stub(salesModel, 'deleteSale').resolves();
    const { status } = await salesService.deleteSale(1);
    expect(status).to.be.deep.equal('DELETED');
  });

  it('testando a função de deletar uma venda inexistente', async function () {
    sinon.stub(salesModel, 'findByIdSale').resolves([]);
    const { status, data } = await salesService.deleteSale(0);
    expect(status).to.be.deep.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Sale not found' });
  });

  it('testando a função de criar uma venda', async function () {
    sinon.stub(salesModel, 'findByIdSale').resolves([{ productId: 1, quantity: 1 }]);
    sinon.stub(salesModel, 'newSale').resolves(1);
    const { status, data } = await salesService.newSale([{ productId: 1, quantity: 1 }]);
    expect(status).to.be.deep.equal('CREATED');
    expect(data).to.be.deep.equal({ id: 1, itemsSold: [{ productId: 1, quantity: 1 }] });
  });
});