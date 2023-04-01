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
const getAll = async () => {
  try {
    const products = await productModel.find();
    return products.map((product) => product.toObject());
  } catch (err) {
    console.error(err);
    throw new Error('Could not get products');
  }
};
const getProduct = async (productId) => {
  try {
    const product = await productModel.findById(productId);
    return product.toObject();
  } catch (err) {
    console.error(err);
    throw new Error('Could not get product');
  }
};

const update = async (productData,productId) => {
  try {
    const product = new Product(productData);
    const updateProduct = await productModel.findByIdAndUpdate(productId,product);
    return updateProduct.toObject();
  } catch (err) {
    console.error(err);
    throw new Error('Could not update product');
  }
};

const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    return deletedProduct.toObject();
  } catch (err) {
    console.error(err); 
    throw new Error('Could not delete product');
  }
};



module.exports = {
  create,getAll,update,deleteProduct,getProduct
};
