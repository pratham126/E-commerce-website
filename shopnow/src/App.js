import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomeScreen from './components/HomeScreen.js';
import Product from './components/Product.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />}></Route>
        <Route path='/product/:id' element={<Product />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
