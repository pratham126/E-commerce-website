import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import {Store} from './Store'

const Header = () => {
  const {state} = useContext(Store);
  const {cart} = state;
  return (
    <header>
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark fixed-top'>
      <Link className='navbar-brand' to='/'>Kirpal Mobile Care</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggle" aria-controls="toggle" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className='collapse navbar-collapse' id='toggle'>
        <ul className='navbar-nav ms-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link'  to='/cart'>Cart<span className="mx-1 badge rounded-pill text-bg-danger">{cart.cartItems.length>0 && cart.cartItems.reduce((a,currVal) => a + currVal.quantity, 0)}</span></Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>Contact</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>Location</Link>
          </li>
        </ul>
      </div>
    </nav>
    </header>
  )
}

export default Header