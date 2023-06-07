import React, { useEffect, useState } from 'react'
import Rating from './Rating'
import Header from './Header'
import axios from 'axios';
import {useParams} from 'react-router-dom'

const Product = () => {
  const param = useParams();
  const [product, setProduct] = useState({});
  useEffect(()=> {
    const fetchData = async() => {
        const data = await axios.get('/product/' + param.id);
        setProduct(data.data);
    }
    fetchData();
  });
  if(product)
  return (
      <div className='container-fluid'>
        <Header />
        <br /><br /><br /><br />
        <div className='row'>
            <div className='text-center col-lg-4 col-md-6'><img className='img-large' src={product.image} alt = {product.name} height ='400px' /></div>
            <div className='container-fluid text-center     mt-5 col-lg-4 col-md-6'>
                    <h1>{product.name}</h1>
                    <hr />
                        <Rating rating={product.rating} /><strong style={{color: '#ffe01a'}}>{product.rating}</strong> 
                        <p style={{color: '#ffe01a'}}>{product.reviews || 0} reviews</p>
                    <hr />
                    <p className=''><strong>Details:</strong></p>
                    <p className='mb-0'><strong>Capacity:</strong> {product.storage}</p>
                    <p><strong>Display:</strong> {product.display} inches</p>
            </div>
            <div className='mylcard container-fluid mt-5 col-lg-4 col-md-6 text-center'>
                <div className='myscard mx-3'>
                    <p>Price: <strong>Rs. {product.price}</strong></p>
                    <p>Status: {product.Stock >0? <span className='badge text-bg-success'>In Stock</span>: <span className='badge text-bg-danger'>Out of Stock</span>}</p>
                    {product.Stock >0 &&  <button className='btn btn-warning'>Add to cart</button>}
                </div>
            </div>
        </div>
    </div>
  )
  return <h2>No such product :(</h2>
}
 
export default Product