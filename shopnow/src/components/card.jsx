import React from 'react'
import Rating from './Rating'
import '../App.css'

const card = (props) => {
  return (
    <div className="mylcard text-center container-fluid col-xxxl-1 col-xxl-2 col-lg-3 col-md-4 col-sm-6">
    <div className='myscard'>
      <a href = {'/product/' + props.obj._id}><img className='rounded' src={props.obj.image} height='200px' width='auto' alt=''/>
      <p>{props.obj.name}</p></a>
       <span><Rating rating={props.obj.rating}/><span style={{color: '#ffe01a'}}>{props.obj.rating}</span></span> 
      <p>Rs. {props.obj.price}</p>
      <button className='btn btn-primary'><a href='https://www.google.com'>Add to cart</a></button>
      </div>
    </div>
  )
}

export default card