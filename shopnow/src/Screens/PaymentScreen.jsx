import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Components/Store';
import CheckoutSteps from '../Components/CheckoutSteps';
import { Helmet } from 'react-helmet-async';
export default function ShippingScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [PaymentMethod, setPaymentMethod] = useState(paymentMethod || 'paypal');
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: PaymentMethod });
    localStorage.setItem('paymentMethod', JSON.stringify(PaymentMethod));
    Navigate('/placeorder');
  };
  useEffect(() => {
    if (!shippingAddress) Navigate('/shipping');
  }, [shippingAddress, Navigate]);
  return (
    <div className="container">
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3 />
      <div className="container-sm">
        <h1 className="my-3 text-center">Shipping Address</h1>
        <form>
          <div className="mb-3 form-check">
            <input
              className="form-check-input"
              type="radio"
              id="paypal"
              value="paypal"
              name="payment"
              checked={PaymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="paypal">
              Paypal
            </label>
          </div>
          <div className="mb-3 form-check">
            <input
              className="form-check-input"
              type="radio"
              id="UPI"
              value="UPI"
              name="payment"
              checked={PaymentMethod === 'UPI'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="UPI">
              UPI
            </label>
          </div>
          <div className="mb-3 form-check">
            <input
              className="form-check-input"
              type="radio"
              id="Net_Banking"
              value="Net_Banking"
              name="payment"
              checked={PaymentMethod === 'Net_Banking'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="Net_Banking">
              Net Banking
            </label>
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
