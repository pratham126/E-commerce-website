import React, { useContext, useEffect, useState } from 'react';
import Rating from '../Components/Rating';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Store } from '../Components/Store';
import { Helmet } from 'react-helmet-async';
const Product = () => {
  const param = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        'https://e-commerce-website-backend-iawo.onrender.com/product/' +
          param.id
      );
      setProduct(data.data);
    };
    fetchData();
  });
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart } = state;
  const HandleAddedItem = async () => {
    const ItemExists = cart.cartItems.find((item) => item._id === product._id);
    const quantity = ItemExists ? ItemExists.quantity + 1 : 1;
    const { data } = await axios(
      'https://e-commerce-website-backend-iawo.onrender.com/product/' +
        product._id
    );
    if (data.Stock < quantity) {
      alert('Cannot add item to cart: Item got out of Stock');
      return;
    }
    contextDispatch({
      type: 'UPDATE_CART',
      payload: { ...product, quantity: quantity },
    });
  };
  if (product)
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="text-center col-lg-4 col-md-6">
            <img
              className="img-large"
              src={product.image}
              alt={product.name}
              height="400px"
            />
          </div>
          <div className="container-fluid text-center mt-5 col-lg-4 col-md-6">
            <h1>{product.name}</h1>
            <hr />
            <Rating rating={product.rating} />
            <strong style={{ color: '#ffe01a' }}>{product.rating}</strong>
            <p style={{ color: '#ffe01a' }}>{product.reviews || 0} reviews</p>
            <hr />
            <p>
              <strong>Details:</strong>
            </p>
            <p className="mb-0">
              <strong>Capacity:</strong> {product.storage}
            </p>
            <p>
              <strong>Display:</strong> {product.display} inches
            </p>
          </div>
          <div className="mylcard container-fluid mt-5 col-lg-4 col-md-6 text-center">
            <div className="myscard mx-3">
              <p>
                Price: <strong>Rs. {product.price}</strong>
              </p>
              <p>
                Status:{' '}
                {product.Stock > 0 ? (
                  <span className="badge text-bg-success">In Stock</span>
                ) : (
                  <span className="badge text-bg-danger">Out of Stock</span>
                )}
              </p>
              {product.Stock > 0 && (
                <button onClick={HandleAddedItem} className="btn btn-warning">
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
      </div>
    );
  return <h2>No such product :(</h2>;
};

export default Product;
