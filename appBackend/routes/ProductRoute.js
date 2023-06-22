import express from 'express';
import Product from '../ProductModel.js';

const ProductRoute = express.Router();

ProductRoute.get('/', async (req, res) => {
  const foundItem = await Product.find({});
  res.send(foundItem);
});

ProductRoute.get('/:id', async (req, res) => {
  const foundItem = await Product.findOne({_id: req.params.id});
  res.send(foundItem);
});

export default ProductRoute;
