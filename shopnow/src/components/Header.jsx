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
    <div className="container-fluid">
      <header>
        <nav className="navbar navbar-expand-sm fixed-top bg-body-tertiary">
          <Link className="navbar-brand" to="/">
            Kirpal Mobile Care
          </Link>
          <div className="ms-1 me-auto">
            {userInfo ? (
              <div className="dropdown">
                <nav
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  {userInfo.name}
                </nav>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="dropdown-item">
                    <Link
                      to={cart ? '/signin' : "/signin?redirect=/shipping"}
                      onClick={HandleSignout}
                    >
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
          </div>
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
                <Link className="nav-link ms-1" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-1" to="/cart">
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
                <Link className="nav-link ms-1" to="/">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-1" to="/">
                  Location
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
