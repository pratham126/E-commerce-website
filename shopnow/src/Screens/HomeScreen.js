import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const incomingData = await axios.get('/product');
      setProducts(incomingData.data);
    };
    fetchData();
  }, []);
  return (
    <div className="container-fluid">
      <h1>Featured Products</h1>
      <div className="container-fluid mx-0 row">
        {products.map((item) => (
          <Card key={item._id} id={item._id} obj={item} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
