const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productService } = require('../../../src/services/index');
const { productModel } = require('../../../src/models/index');
const mockProducts = require('../../mocks/products.mocks');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando o service de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('mostrando todos os produtos com sucesso', async function () {
    sinon.stub(productModel, 'findAll').resolves(mockProducts);
    const { status, data } = await productService.findAll();
    expect(status).to.be.deep.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(mockProducts);
  });

  it('mostrando um produto com sucesso', async function () {
    sinon.stub(productModel, 'findAll').resolves(mockProducts.allProducts);
    const { status, data } = await productService.findById(1);
    expect(status).to.be.deep.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(mockProducts.allProducts[0]);
  });

  it('mostrando um produto que nao existe', async function () {
    sinon.stub(productModel, 'findById').resolves([]);
    const { status, data } = await productService.findById(0);
    expect(status).to.be.deep.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('criando um produto com sucesso', async function () {
    const newProduct = { name: 'new product' };
    sinon.stub(productModel, 'newProduct').resolves(newProduct);
    const { status, data } = await productService.newProduct(newProduct);
    expect(status).to.be.deep.equal('CREATED');
    expect(data).to.be.deep.equal(newProduct);
  });

  it('atualizando um produto com sucesso', async function () {
    const updatedProduct = { id: 1, name: 'updated product' };
    sinon.stub(productModel, 'findById').resolves([mockProducts.allProducts[0]]);
    sinon.stub(productModel, 'updateProduct').resolves(updatedProduct);
    const { status, data } = await productService.updateProduct(1, updatedProduct);
    expect(status).to.be.deep.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(updatedProduct);
  });

  it('atualizando um produto que nao existe', async function () {
    sinon.stub(productModel, 'findById').resolves([]);
    const { status, data } = await productService.updateProduct(0, {});
    expect(status).to.be.deep.equal('NOT_FOUND');
    expect(data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('deletando um produto com sucesso', async function () {
    sinon.stub(productModel, 'findById').resolves([mockProducts.allProducts[0]]);
    sinon.stub(productModel, 'deleteProduct').resolves();
    const { status } = await productService.deleteProduct(1);
    expect(status).to.be.deep.equal('DELETED');
  });
});