const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services/index');
const { salesController } = require('../../../src/controllers/index');
const { allSales } = require('../../mocks/sales.mocks');

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
});