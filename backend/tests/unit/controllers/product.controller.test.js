const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productService } = require('../../../src/services/index');
const { productController } = require('../../../src/controllers/index');
const { allProducts } = require('../../mocks/products.mocks');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando o controller de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('testando se a função findAll retorna todos os produtos', async function () {
    sinon.stub(productService, 'findAll').resolves({ status: 'SUCCESSFUL', data: allProducts });
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('testando se a função findById retorna um produto', async function () {
    sinon.stub(productService, 'findById').resolves({ status: 'SUCCESSFUL', data: allProducts[0] });
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts[0]);
  });

  it('testando se a função newProduct retorna um produto', async function () {
    sinon.stub(productService, 'newProduct').resolves({ status: 'SUCCESSFUL', data: allProducts[0] });
    const req = { body: { name: 'produto teste' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.newProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts[0]);
  }); 

  it('testando se a função updateProduct retorna um produto', async function () {
    sinon.stub(productService, 'updateProduct').resolves({ status: 'SUCCESSFUL', data: allProducts[0] });
    const req = { params: { id: 1 }, body: { name: 'produto teste' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts[0]);
  });

  it('testando se a função deleteProduct retorna um produto', async function () {
    sinon.stub(productService, 'deleteProduct').resolves({ status: 'DELETED' });
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.deleteProduct(req, res);
    expect(res.json).to.have.been.calledWith();
  });
});