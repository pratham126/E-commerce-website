import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import Product from './Screens/ProductScreen';
import Cart from './Screens/CartScreen';
import Header from './Components/Header.jsx';
import SigninScreen from './Screens/SigninScreen';
import SignupScreen from './Screens/SignupScreen';
import ShippingScreen from './Screens/ShippingScreen';
import Footer from './Components/Footer';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import ProfileScreen from './Screens/ProfileScreen';
import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://e-commerce-website-backend-iawo.onrender.com/')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  console.log(message);
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      <Header />
      <br />
      <br />
      <br />
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/orderhistory" element={<OrderHistoryScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
