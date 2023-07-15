const crypto = require('crypto');
const { getProducts, getProductById, updateProductStock, createProduct } = require('../../src/api/controllers/product-controller.js');
const { getAllProducts, getProduct, updateStock, addProduct } = require('../../src/api/service/data-operations.js');
const { createMockRequestResponse } = require('../test-utils/mock-request-response.js');
const { mockedProducts, mockedProduct, mockedNewProduct } = require('../data/mockedData.js')
const { responseProducts } = require('../data/responseData.js')

jest.mock( '../../src/api/service/data-operations.js', () => ({
  getAllProducts: jest.fn(),
  getProduct: jest.fn(),
  updateStock: jest.fn(),
  addProduct: jest.fn(),
}));

describe('Products controller', () => {
    describe('getProducts', () => {
        test('should get all products with status 200', () => {
            getAllProducts.mockReturnValueOnce(mockedProducts);
            const { req, res } = createMockRequestResponse();
            getProducts(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(responseProducts);
        });
        test('should return status 500 on error', () => {
            getAllProducts.mockImplementationOnce(() => {
              throw new Error('Something went wrong.');
            });
            const { req, res } = createMockRequestResponse();
            getProducts(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: 'Something went wrong.' });
          });
    });
    describe('getProductById', () => {
        test('should return the product with status 200 if found', () => {
            const productId = 'f74fb16e-62b2-4af1-abed-1a0516200d1b';
            getProduct.mockReturnValueOnce(mockedProduct);
            const { req, res } = createMockRequestResponse();
            req.params = { productId };
            getProductById(req, res);
            expect(getProduct).toHaveBeenCalledWith(productId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockedProduct);
        });
        test('should return status 404 if product is not found', () => {
            const productId = 'invalid-product-id';
            getProduct.mockReturnValueOnce(null);
            const { req, res } = createMockRequestResponse();
            req.params = { productId };
            getProductById(req, res);
            expect(getProduct).toHaveBeenCalledWith(productId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Product not found.' });
        });
        test('should return status 500 on error', () => {
            const productId = 'f74fb16e-62b2-4af1-abed-1a0516200d1b';
            getProduct.mockImplementationOnce(() => {
              throw new Error('Something went wrong.');
            });
            const { req, res } = createMockRequestResponse();
            req.params = { productId };
            getProductById(req, res);
            expect(getProduct).toHaveBeenCalledWith(productId);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: 'Something went wrong.' });
          });
    });
    describe('updateProductStock', () => {
        test('should update product stock and return updated products with status 200 if product found', () => {
            const productId = 'f74fb16e-62b2-4af1-abed-1a0516200d1b';
            const stock = 10;
            const updatedProductWithStock = {
                id: mockedProduct.id,
                name: mockedProduct.name,
                price: mockedProduct.price,
                stock: stock
            }
            getProduct.mockReturnValueOnce(mockedProduct);
            updateStock.mockReturnValueOnce(updatedProductWithStock);
            const { req, res } = createMockRequestResponse();
            req.params = { productId };
            req.body = { stock };
            updateProductStock(req, res);
            expect(getProduct).toHaveBeenCalledWith(productId);
            expect(updateStock).toHaveBeenCalledWith(mockedProduct, stock);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(updatedProductWithStock);
        });
        test('should return status 404 if product is not found', () => {
            const productId = 'invalid-product-id';
            const stock = 10;
            getProduct.mockReturnValueOnce(null);
            const { req, res } = createMockRequestResponse();
            req.params = { productId };
            req.body = { stock };
            updateProductStock(req, res);
            expect(getProduct).toHaveBeenCalledWith(productId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Product not found.' });
        });
        test('should return status 500 on error', () => {
            const productId = 'f74fb16e-62b2-4af1-abed-1a0516200d1b';
            const stock = 10;
            getProduct.mockReturnValueOnce(mockedProduct);
            updateStock.mockImplementationOnce(() => {
              throw new Error('Something went wrong.');
            });
            const { req, res } = createMockRequestResponse();
            req.params = { productId };
            req.body = { stock };
            updateProductStock(req, res);
            expect(getProduct).toHaveBeenCalledWith(productId);
            expect(updateStock).toHaveBeenCalledWith(mockedProduct, stock);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: 'Something went wrong.' });
        });
    });
    describe('createProduct', () => {
        test('should create a new product and return it with status 201', () => {
            const newId = crypto.randomUUID();
            const createdProduct = { ...mockedNewProduct, id: newId };
            addProduct.mockReturnValueOnce(createdProduct);
            const { req, res } = createMockRequestResponse();
            req.body = mockedNewProduct;
            createProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(createdProduct);
        });

        test('create product should return status 500 on error', () => {
            addProduct.mockImplementationOnce(() => {
              throw new Error('Something went wrong.');
            });
            const { req, res } = createMockRequestResponse();
            req.body = mockedNewProduct;
            createProduct(req, res);
            expect(addProduct).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: 'Something went wrong.' });
        });
    });

});