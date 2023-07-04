import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from './Store';

const Header = () => {
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const HandleSignout = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('address');
    localStorage.removeItem('paymentMethod');
  };
  return (
    <header>
      <nav className="navbar navbar-expand-sm fixed-top bg-body-tertiary">
        <Link className="navbar-brand ms-1" to="/">
          Kirpal Mobile Care
        </Link>
        {userInfo ? (
          <div className="dropdown">
            <nav className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              {userInfo.name}
            </nav>
            <ul className="dropdown-menu">
              <li className="dropdown-item">User Profile</li>
              <li className="dropdown-item">Order History</li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-item">
                <Link to="/signin?redirect=/shipping" onClick={HandleSignout}>
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="navbar-nav nav-link me-auto" to="/signin">
            Sign in
          </Link>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#toggle"
          aria-controls="toggle"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="toggle">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
                <span className="mx-1 badge rounded-pill text-bg-danger">
                  {cart.cartItems.length > 0 &&
                    cart.cartItems.reduce(
                      (a, currVal) => a + currVal.quantity,
                      0
                    )}
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Location
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
