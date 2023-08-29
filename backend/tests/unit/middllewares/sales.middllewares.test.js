const { expect } = require('chai');
const sinon = require('sinon');
const { mapStatus } = require('../../../src/utils/mapStatus');
const { validateFields: [validateProduct, validateQuantity, validateQuantityValue] } = require('../../../src/middlewares/sales.middllewares');

describe('Testes dos middllewares de sales', function () {
    let mockRequest;
    let mockResponse;
    let nextStub;

    beforeEach(function () {
      mockRequest = { body: [] };
      mockResponse = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub().returns(),
      };
      nextStub = sinon.stub();
   });

   it('validar o campo "productID"', function () {
     mockRequest.body = [{ quantity: 5 }];
     validateProduct(mockRequest, mockResponse, nextStub);
      expect(mockResponse.status.calledWith(mapStatus('BAD_REQUEST'))).to.be.equal(true);
      expect(mockResponse.json.calledWith({ message: '"productId" is required' })).to.be.equal(true);
      expect(nextStub.called).to.be.equal(false);
   });

    it('validar o campo "quantity"', function () {
      mockRequest.body = [{ productId: 5 }];
      validateQuantity(mockRequest, mockResponse, nextStub);
      expect(mockResponse.status.calledWith(mapStatus('BAD_REQUEST'))).to.be.equal(true);
      expect(mockResponse.json.calledWith({ message: '"quantity" is required' })).to.be.equal(true);
      expect(nextStub.called).to.be.equal(false);
    });

    it('validar o campo "quantity" com valor menor ou igual a zero', function () {
      mockRequest.body = [{ productId: 5, quantity: 0 }];
      validateQuantityValue(mockRequest, mockResponse, nextStub);
      expect(mockResponse.status.calledWith(mapStatus('INVALID_VALUES'))).to.be.equal(true);
      expect(mockResponse.json.calledWith({ message: '"quantity" must be greater than or equal to 1' })).to.be.equal(true);
      expect(nextStub.called).to.be.equal(false);
    });
  });