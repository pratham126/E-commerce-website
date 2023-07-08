import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Components/Store';
import { Helmet } from 'react-helmet-async';
const Cart = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const IncItem = (item) => {
    dispatch({
      type: 'UPDATE_CART',
      payload: { ...item, quantity: item.quantity + 1 },
    });
  };
  const DecItem = (item) => {
    dispatch({
      type: 'UPDATE_CART',
      payload: { ...item, quantity: item.quantity - 1 },
    });
  };
  const delItem = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { ...item } });
  };
  if (cart.cartItems.length === 0)
    return (
      <span>
        <h1>Shopping Cart</h1>
        <br />
        <p className="text-center">
          Your cart is empty <br />
          <strong>
            <Link to="/">Go Shopping</Link>
          </strong>
        </p>
      </span>
    );
  else
    return (
      <div>
        <h1>Shopping Cart</h1>
        <br />
        <div className="row m-2">
          <div className="col-md-9 list-group p-0">
            {cart.cartItems.map((item) => (
              <div className="list-group-item mb-1" key={item._id}>
                <div
                  className="row align-items-center text-center"
                  key={item._id}
                >
                  <div className="col-md-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-rounded thumbnail"
                    />
                  </div>
                  <div className="col-md-3">
                    <Link to={'/product/' + item._id} className="col-md-3">
                      {item.name}
                    </Link>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center align-items-center p-2">
                    <button
                      className="btn"
                      onClick={() => DecItem(item)}
                      disabled={item.quantity === 1}
                    >
                      <i className="fa-solid fa-circle-minus"></i>
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn"
                      onClick={() => IncItem(item)}
                      disabled={item.quantity === item.Stock}
                    >
                      <i className="fa-solid fa-circle-plus"></i>
                    </button>
                  </div>
                  <span className="col-md-3">Rs. {item.price}</span>
                  <button
                    className="btn col-md-1"
                    onClick={() => delItem(item)}
                  >
                    <i onClick={delItem} className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-3 text-center">
            <h3>
              Subtotal ({cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
              items)
            </h3>
            <h3>
              Rs. {cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
            </h3>
            <hr />
            <button
              type="button"
              onClick={() => navigate('/signin?redirect=/shipping/')}
              className="btn btn-primary"
              disabled={cart.cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
        <Helmet>
          <title>Shopping Cart</title>
        </Helmet>
      </div>
    );
};

export default Cart;
