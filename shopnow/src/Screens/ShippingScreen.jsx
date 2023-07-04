import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../components/Store';
import CheckoutSteps from '../components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
export default function ShippingScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [address, setAddress] = useState(shippingAddress);
  function handleAddress(e_target) {
    const { id, value } = e_target;
    setAddress((prvVal) => ({ ...prvVal, [id]: value }));
  }
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: address });
    localStorage.setItem('address', JSON.stringify(address));
    Navigate('/payment');
  };
  useEffect(() => {
    if (!userInfo) Navigate('/signin?redirect=/shipping');
  });
  //Yet to add dependencies in useEffect.
  return (
    <div className="container">
      <Helmet>
        <title>Shipping</title>
      </Helmet>
      <CheckoutSteps step1 step2 />
      <div className="container-sm">
        <h1 className="my-3 text-center">Shipping Address</h1>
        <form action="/shipping" type="post">
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className="form-control"
              id="name"
              type="text"
              placeholder="Enter full name"
              onChange={(e) => handleAddress(e.target)}
              value={address.name}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="add">
              Address
            </label>
            <input
              className="form-control"
              id="add"
              type="text"
              placeholder="Enter address"
              onChange={(e) => handleAddress(e.target)}
              value={address.add}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="city">
              City
            </label>
            <input
              className="form-control"
              id="city"
              type="text"
              placeholder="Enter City name"
              onChange={(e) => handleAddress(e.target)}
              value={address.city}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="pcode">
              Postal Code
            </label>
            <input
              className="form-control"
              id="pcode"
              type="number"
              placeholder="Enter Postal Code"
              onChange={(e) => handleAddress(e.target)}
              value={address.pcode}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="country">
              Country
            </label>
            <input
              className="form-control"
              id="country"
              type="text"
              placeholder="Enter Country name"
              onChange={(e) => handleAddress(e.target)}
              value={address.country}
              required
            ></input>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="mb-2 btn btn-primary"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
