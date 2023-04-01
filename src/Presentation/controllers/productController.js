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
  const getProducts = async (req, res) => {
    try {
      const products = await productService.getProducts();
      res.status(200).json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error products' });
    }
  };
  const updateProduct = async (req, res) => {
    try {
      const product = req.body; // assuming user details are passed in the request body
      const productId = req.params.id;
      console.log(product);
      const updatedProduct = await productService.updateProduct(product,productId);
      res.status(200).json(updatedProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error product' });
    }
  };
  const deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await productService.deleteProduct(productId);
      res.status(200).json(deletedProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error product' });
    }
  };
  const getProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await productService.getProduct(productId);
      res.status(200).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error product' });
    }
  };



module.exports = {
    addProduct,getProducts,updateProduct,deleteProduct,getProduct
};
