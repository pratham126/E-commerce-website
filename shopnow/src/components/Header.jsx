import React from 'react'

const Header = () => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark fixed-top'>
      <a className='navbar-brand' href='/'>Kirpal Mobile Care</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggle" aria-controls="toggle" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className='collapse navbar-collapse' id='toggle'>
        <ul className='navbar-nav ms-auto'>
          <li className='nav-item'>
            <a className='nav-link' href='/'>Home</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/'>About</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/'>Contact</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/'>Location</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header