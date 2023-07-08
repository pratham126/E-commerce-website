import React from 'react'

const Rating = (props) => {
    return (
    <span className='container-fluid ps-0'>
        <span>
        <i className={props.rating>=1 ? "fa-solid fa-star" : props.rating >= 0.5 ?
        "fa-regular fa-star-half-stroke" : "fa-regular fa-star"} 
        style={{color: '#ffe01a'}}></i>
        </span>
        <span>
        <i className={props.rating>=2 ? "fa-solid fa-star" : props.rating >= 1.5 ?
        "fa-regular fa-star-half-stroke" : "fa-regular fa-star"} 
        style={{color: '#ffe01a'}}></i>
        </span>
        <span>
        <i className={props.rating>=3 ? "fa-solid fa-star" : props.rating >= 2.5 ?
        "fa-regular fa-star-half-stroke" : "fa-regular fa-star"} 
        style={{color: '#ffe01a'}}></i>
        </span>
        <span>
        <i className={props.rating>=4 ? "fa-solid fa-star" : props.rating >= 3.5 ?
        "fa-regular fa-star-half-stroke" : "fa-regular fa-star"} 
        style={{color: '#ffe01a'}}></i>
        </span>
        <span>
        <i className={props.rating>=5 ? "fa-solid fa-star" : props.rating >= 4.5 ?
        "fa-regular fa-star-half-stroke" : "fa-regular fa-star"} 
        style={{color: '#ffe01a'}}></i>
        </span>
    </span>
  )
}

export default Rating