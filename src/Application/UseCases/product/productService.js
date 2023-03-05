const productRepository = require('../../../Domain/IRepositories/ProductRepository');

const addProduct = async (product) => {
  try {
    return await productRepository.create(product);
  } catch (err) {
    console.error(err);
    throw new Error('Could not create product');
  }
};

module.exports = {
    addProduct,
};
