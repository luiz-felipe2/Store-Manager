const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productService } = require('../../../src/services/index');
const { productModel } = require('../../../src/models/index');
const { allProducts } = require('../../mocks/products.mocks');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando o service de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('mostrando todos os produtos com sucesso', async function () {
    sinon.stub(productModel, 'findAll').resolves(allProducts);
    const { status, data } = await productService.findAll();
    expect(status).to.be.deep.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(allProducts);
  });

  it('mostrando um produto com sucesso', async function () {
    const [firstProduct] = allProducts;
    const { id } = firstProduct;
    sinon.stub(productModel, 'findAll').resolves(firstProduct);
    const { status, data } = await productService.findById(id);
    expect(status).to.be.deep.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal(firstProduct);
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
});