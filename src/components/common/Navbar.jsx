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

            {/*desktop navigation links*/}

          <div className='navbar-links'>
            <Link to="/" className="nav-link">Home</Link>

            {/*If logged in these will show too */}
            {isLoggedIn && (<>
            <link to = '/countries' className='nav-link'>countries</link>
            <link to = '/countries' className='nav-link'>countries</link>
            <link to = '/countries' className='nav-link'>countries</link>
            </>
            )}
          </div>

          {/*user actionslike logging in */}
          <div className='navbar-actions'>
            {!isLoggedIn ?(
                <div className='auth-buttons'>
                    <button onClick={handleLogin} className ='button-secondary-small'>
                        Login
                    </button>
                    <link to='signup' className='button-primary-small'>
                    signup
                    </link>

                </div>

            ) : (
                <div className='user-menu'>
                    <button className='user-profile-btn' onClick={toggleUserDropdown} aria-expanded={showUserDropdown} aria-haspopup={true}>
                        
                    </button>
                </div>

            )}
          </div>
            </div>
        </div>
    </nav>
  )