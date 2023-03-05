const productService = require('../../Application/UseCases/product/productService');
const product = require('../../Domain/Entities/product')

const addProduct = async (req, res) => {
  try {
    const product = req.body; // assuming user details are passed in the request body
    const createdProduct = await productService.addProduct(product);
    res.status(201).json(createdProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error product' });
  }
};

module.exports = {
    addProduct,
};
