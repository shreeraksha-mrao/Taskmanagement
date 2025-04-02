import React from 'react'
import './navbar.css';
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='navbar'>
        <ol>
            <li><Link to = '/'>Home</Link></li>
            <li><Link to = '/editors'>Editors</Link></li>
            <li><Link to = '/tasks'>All Tasks</Link></li>
            <li><Link to = '/map'>Map</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ol>
    </div>
  )
}

export default Navbar