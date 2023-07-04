import React, { useContext, useEffect, useReducer } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
import { Store } from '../components/Store';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAILED':
      return { ...state, loading: false };
    default:
      return state;
  }
};

const PlaceOrderScreen = () => {
  const PlaceOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await Axios.post(
        '/api/orders',
        {
          cartItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemPrice: cart.itemPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${state.userInfo.token}`,
          },
        }
      );
      ctxdispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      Navigate(`/order/${data.order._id}`);
    } catch (err) {
      toast.error(err.message);
    }
  };
  const [{ loading }, dispatch] = useReducer(reducer, { loading: false });
  const Navigate = useNavigate();
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const { cart } = state;
  cart.itemPrice = cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  cart.shippingPrice = cart.itemPrice >= 1000 ? 0 : 100;
  cart.taxPrice = (cart.itemPrice * 1.5) / 100;
  cart.totalPrice = cart.itemPrice + cart.shippingPrice + cart.taxPrice;
  useEffect(() => {
    if (!cart.paymentMethod) Navigate('/payment');
  }, [Navigate, cart]);
  return (
    <div className="container">
      <CheckoutSteps step1 step2 step3 step4 />
      <Helmet>
        <title>Order Summary</title>
      </Helmet>
      <h1 className="text-center my-3">Place Order</h1>
      <div className="container-fluid row">
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">
              <span className="card-title">Shipping</span>
              <p className="card-text">
                <strong>Name:</strong>
                {cart.shippingAddress.name} <br />
                <strong>Address:</strong>
                {cart.shippingAddress.add}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.pcode}, {cart.shippingAddress.country}
              </p>
              <Link className="Link" to="/shipping">
                Edit
              </Link>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <span className="card-title">Payment</span>
              <p className="card-text">
                <strong>Method:</strong>
                {cart.paymentMethod}
              </p>
              <Link className="Link" to="/payment">
                Edit
              </Link>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <span className="card-title">Items</span>
              <div className="list-group">
                {cart.cartItems.map((Item) => (
                  <div className="list-group-item" key={Item._id}>
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <img
                          src={Item.image}
                          alt={Item.name}
                          className="img-fluid rounded thumbnail"
                        />{' '}
                        <Link to={'/product/' + Item._id}>{Item.name}</Link>
                      </div>
                      <div className="col-md-3">
                        <span>{Item.quantity}</span>
                      </div>
                      <div className="col-md-3">
                        <span>Rs. {Item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link className="Link" to="/cart">
                Edit
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <span className="card-title">Order Summary</span>
              <div className="list-group list-group-flush">
                <div className="list-group-item">
                  <div className="row">
                    <div className="col-md-6">Items</div>
                    <div className="col-md-6">
                      <strong>Rs. {cart.itemPrice}</strong>
                    </div>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="row">
                    <div className="col-md-6">Shipping</div>
                    <div className="col-md-6">
                      <strong>Rs. {cart.shippingPrice}</strong>
                    </div>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="row">
                    <div className="col-md-6">Tax</div>
                    <div className="col-md-6">
                      <strong>Rs. {cart.taxPrice}</strong>
                    </div>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="row">
                    <div className="col-md-6">Order Total</div>
                    <div className="col-md-6">
                      <strong>Rs. {cart.totalPrice}</strong>
                    </div>
                  </div>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary mt-3"
                    type="button"
                    onClick={PlaceOrderHandler}
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </button>
                </div>
                {loading && <LoadingBox />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
