import React, { useContext, useEffect, useReducer } from 'react';
import LoadingBox from '../components/LoadingBox';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../components/Store';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '', order: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, successPay: false, loadingPay: false };
    default:
      return state;
  }
};
const OrderScreen = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const Navigate = useNavigate();
  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
      order: {},
      successPay: false,
      loadingPay: false,
    });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: (order.totalPrice / 82).toFixed(2) },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await Axios.put(
          `https://e-commerce-website-backend-iawo.onrender.com/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Payment Successful');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: err.message });
        toast.error(err.message);
      }
    });
  };
  const onError = (err) => {
    toast.error(err.message);
  };
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await Axios.get(`https://e-commerce-website-backend-iawo.onrender.com/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    if (!userInfo) return Navigate('/signin');
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) dispatch({ type: 'PAY_RESET' });
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await Axios.get('https://e-commerce-website-backend-iawo.onrender.com/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: 'resetOptions',
          value: { 'client-id': clientId, currency: 'USD' },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [order, orderId, userInfo, Navigate, paypalDispatch, successPay]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox varient="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3 text-center">Order {orderId}</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">
              <span className="cart-title">Shipping</span>
              <p className="card-text">
                <strong>Name:</strong>
                {order.shippingAddress.name} <br />
                <strong>Address:</strong>
                {order.shippingAddress.add}, {order.shippingAddress.city},
                {order.shippingAddress.pcode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <MessageBox varient="success">
                  Delivered on {order.deliveredOn}
                </MessageBox>
              ) : (
                <MessageBox varient="danger">Not Delivered</MessageBox>
              )}
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <span className="cart-title">Payment</span>
              <p className="card-text">
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <MessageBox varient="success">
                  Paid on {order.paidOn}
                </MessageBox>
              ) : (
                <MessageBox varient="danger">Not Paid</MessageBox>
              )}
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <span className="cart-title">Items</span>
              <div className="list-group list-group-flush">
                {order.cartItems.map((Item) => (
                  <div className="list-group-item" key={Item._id}>
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <img
                          src={Item.image}
                          alt={Item.name}
                          className="img-flush rounded thumbnail"
                        />{' '}
                        <Link to={`/product/${Item._id}`}>{Item.name}</Link>
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
                      <strong>Rs. {order.itemPrice}</strong>
                    </div>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="row">
                    <div className="col-md-6">Shipping</div>
                    <div className="col-md-6">
                      <strong>Rs. {order.shippingPrice}</strong>
                    </div>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="row">
                    <div className="col-md-6">Tax</div>
                    <div className="col-md-6">
                      <strong>Rs. {order.taxPrice}</strong>
                    </div>
                  </div>
                </div>
                <div className="list-group-item">
                  <div className="row">
                    <div className="col-md-6">Order Total</div>
                    <div className="col-md-6">
                      <strong>Rs. {order.totalPrice} (${(order.totalPrice / 82).toFixed(2)})</strong>
                    </div>
                  </div>
                </div>
                {!order.isPaid && (
                  <div className="list-group-item">
                    {isPending ? (
                      <LoadingBox />
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    )}
                    {loadingPay && <LoadingBox />}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
