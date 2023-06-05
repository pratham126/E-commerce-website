import React from 'react'
import {useParams} from 'react-router-dom'

const Product = () => {
  const param = useParams();
  console.log(param);
    return (
    <div>{param.id}</div>
  )
}

export default Product