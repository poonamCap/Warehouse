const fs = require('fs');

let productsData = null;

const loadProducts = ()=> {
    const inventoryPath = './data/products.json';
    return new Promise((resolve, reject) => {
        fs.readFile(inventoryPath, 'utf8', (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          const productsDataJson = JSON.parse(data);
          productsData = productsDataJson.products;
          resolve();
        });
      });
}
const updateStock = (product, updatedStock)=> {
    const { id } = product;
    productsData.forEach((obj, index) => {
        if (obj.id == id) {
          productsData[index].stock = updatedStock;
        }
    });
    console.log(productsData);
    const updatedProduct = getProduct(id);
    return updatedProduct;
}
const getProduct = (productId)=> {
    const product = productsData.find((p) => p.id == productId);
    if (product === undefined) {
      return null;
    }
    return product;
}
const getAllProducts = () => {
    return productsData;
};
const addProduct = (product) => {
    productsData.push(product);
    return product;
};
module.exports = {
    loadProducts,
    getAllProducts,
    getProduct,
    updateStock,
    addProduct
};