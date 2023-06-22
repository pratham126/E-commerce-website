import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import Product from './Screens/ProductScreen';
import Cart from './components/Cart';
import Header from './components/Header';
import SigninScreen from './Screens/SigninScreen';
import SignupScreen from './Screens/SignupScreen';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
