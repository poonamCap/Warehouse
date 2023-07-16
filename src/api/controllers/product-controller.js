const crypto = require('crypto');

const { getAllProducts, getProduct, updateStock, addProduct } = require('../service/data-operations.js');
const { PRODUCT_NOT_FOUND, BAD_REQUEST} = require('../shared/constants.js');

const getProducts = ((req, res, next) => {
    try {
        const products = getAllProducts();
        res.status(200).send(products);
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
})
const getProductById = (req, res, next) => {
    try {
        const productId = req.params['productId'];
        const product = getProduct(productId);
        if (product === null) {
            console.log('error');
            return res.status(404).json({ error: PRODUCT_NOT_FOUND });
        }
        res.status(200).send(product);
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
};
const updateProductStock = ((req, res, next) => {
    try {
        const productId = req.params['productId'];
        const data = req.body;
        const stock  = data.stock;
        if (!('stock' in req.body)) {
            return res.status(400).json({ error: BAD_REQUEST });
        }
        const product = getProduct(productId);
        if (!product) {
            return res.status(404).json({ error: PRODUCT_NOT_FOUND });
        }
        const updatedProduct = updateStock(product, stock);
        res.status(200).send(updatedProduct);
    } catch (error) {
        next(error);
    }
})

const createProduct = ((req, res, next) => {
    try {
        const data = req.body;
        const id = crypto.randomUUID();
        const product = { ...data, id};
        const newProduct = addProduct(product);
        res.status(201).send(newProduct);
    } catch (error) {
        next(error);
    }
})

module.exports = {
    getProducts,
    updateProductStock,
    getProductById,
    createProduct
}