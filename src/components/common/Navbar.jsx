import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//idk how youll do it arnold tbh but im gonna fake the logged in state so its easier for me lol
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  //dropdown for the user now
    const [showUserDropdown, setShowUserDropdown] = useState(false);

     const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };
  return(
    <nav className='navbar'>
        <div className='container'>
            <div className='navbar-content'>
            <Link to="/" className="navbar-brand">
             <img 
              src="/src/assets/logo.png" 
              alt="Culture Compass" 
              className="brand-logo"
            />
          </Link>
            </div>
        </div>
    </nav>
  )