import React from 'react'

const CheckoutSteps = (props) => {
  return (
    <div className='row checkout-steps text-center'>
        <div className={'col-sm-3 ' + (props.step1 ? 'active': '')}>Sign-in</div>
        <div className={'col-sm-3 ' + (props.step2 ? 'active': '')}>Shipping</div>
        <div className={'col-sm-3 ' + (props.step3 ? 'active': '')}>Payment</div>
        <div className={'col-sm-3 ' + (props.step4 ? 'active': '')}>Place Order</div>
    </div>
  )
}

export default CheckoutSteps