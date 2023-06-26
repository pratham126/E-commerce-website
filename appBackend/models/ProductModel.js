import mongoose from 'mongoose';

const ProdSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    display: { type: Number, required: true },
    image: { type: String, required: true },
    storage: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, required: true },
    Stock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('products', ProdSchema);

export default Product;
