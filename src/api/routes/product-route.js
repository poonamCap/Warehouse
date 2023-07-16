// https://dev.to/ericchapman/nodejs-express-part-5-routes-and-controllers-55d3
const express = require('express');
const router = express.Router();
const  {
    getProducts, updateProductStock, getProductById, createProduct
} = require('../controllers/product-controller.js');
const { validateCreateProductRequest, validateRequest } = require('../middlewares/express-validation.js');

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.post('/', validateCreateProductRequest, validateRequest, createProduct);
router.put('/:productId/stock', updateProductStock);

module.exports = router;