const Product = require('../Entities/product');
const productModel = require('../../Infrastructure/Models/productModel');

const create = async (productData) => {
  try {
    const product = new Product(productData);
    const createdProduct = await productModel.create(product);
    return createdProduct.toObject();
  } catch (err) {
    console.error(err);
    throw new Error('Could not create product');
  }
};

module.exports = {
  create,
};
