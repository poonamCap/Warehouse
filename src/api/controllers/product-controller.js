const crypto = require('crypto');

const { getAllProducts, getProduct, updateStock, addProduct } = require('../service/data-operations.js');
const getProducts = ((req, res) => {
    try {
        const products = getAllProducts();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong.' });
    }
})
const getProductById = ((req, res) => {
    try {
        const productId = req.params['productId'];
        const product = getProduct(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong.' });
    }
})
const updateProductStock = ((req, res) => {
    try {
        const productId = req.params['productId'];
        const data = req.body;
        const stock  = data.stock;
        const product = getProduct(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        const updatedProduct = updateStock(product, stock);
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong.' });
    }
})

const createProduct = ((req, res) => {
    try {
        const data = req.body;
        const id = crypto.randomUUID();
        const product = { ...data, id};
        console.log(product);
        const newProduct = addProduct(product);
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong.' });
    }
})

module.exports = {
    getProducts,
    updateProductStock,
    getProductById,
    createProduct
}