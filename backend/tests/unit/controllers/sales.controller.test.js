const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services/index');
const { salesController } = require('../../../src/controllers/index');
const { allSales, noId } = require('../../mocks/sales.mocks');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando o controller de vendas', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('testando se a função findAllSale retorna todas as vendas', async function () {
    sinon.stub(salesService, 'findAllSale').resolves({ status: 'SUCCESSFUL', data: allSales });
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.findAllSale(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales);
  });

  it('testando se a função findByIdSale retorna uma venda', async function () {
    sinon.stub(salesService, 'findByIdSale').resolves({ status: 'SUCCESSFUL', data: allSales[0] });
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.findByIdSale(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales[0]);
  });

  it('testando se a função newSale retorna uma venda', async function () {
    sinon.stub(salesService, 'newSale').resolves({ status: 'CREATED', data: allSales[0] });
    const req = { body: [{ productId: 1, quantity: 1 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.newSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(allSales[0]);
  });

  it('testando se a função newSale retorna um erro, caso algum produto não exista', async function () {
   const req = { body: noId };
   const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
   };
   sinon.stub(salesService, 'newSale').resolves({ status: 'NOT_FOUND', data: { message: '"productId" is required' } });
    await salesController.newSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('testando se a função deleteSale deleta uma venda', async function () {
    sinon.stub(salesService, 'deleteSale').resolves({ status: 'DELETED' });
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.deleteSale(req, res);
    expect(res.json).to.have.been.calledWith();
  });

  it('testando se a função deleteSale retorna um erro, caso a venda não exista', async function () {
    sinon.stub(salesService, 'deleteSale').resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });
    const req = { params: { id: 0 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
});