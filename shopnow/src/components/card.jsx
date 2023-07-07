import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Rating from './Rating'
import '../App.css'
import {Store} from './Store'
import axios from 'axios'

const Card = (props) => {
  const {state, dispatch} = useContext(Store);
  const {cart} = state;
  const HandleAddedItem = async() => {
    const itemExists = cart.cartItems.find(item => item._id === props.obj._id)
    const quantity = itemExists ? itemExists.quantity+1 : 1; 
    const {data} = await axios('https://e-commerce-website-backend-iawo.onrender.com/product/' + props.obj._id);
    if(data.Stock < quantity){
      alert('Could not add item: item got out of stock.')
      return;
    }
    dispatch({type: 'UPDATE_CART' , payload: {...props.obj, quantity: quantity}})
  }
  return (
    <div className="mb-1 mylcard text-center container-fluid col-xxxl-1 col-xxl-2 col-lg-3 col-md-4 col-sm-6">
    <div className='myscard'>
      <Link to= {'/product/' + props.obj._id}><img className='rounded' src={props.obj.image} height='200px' width='auto' alt=''/>
      <p>{props.obj.name}</p></Link>
       <span><Rating rating={props.obj.rating}/><span style={{color: '#ffe01a'}}>{props.obj.rating}</span></span> 
      <p>Rs. {props.obj.price}</p>
      {props.obj.Stock>0 ? <button onClick={HandleAddedItem} className='btn btn-primary'>Add to cart</button> : <button onClick={HandleAddedItem} className='btn btn-secondary disabled'>Out of Stock</button>}
      </div>
    </div>
  )
}

export default Card