import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//idk how youll do it arnold tbh but im gonna fake the logged in state so its easier for me lol
const NavBar =() => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  //dropdown for the user now
    const [showUserDropdown, setShowUserDropdown] = useState(false);

     const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };
  return(
    <nav className='navbar'>
        <div className='nav-container'>
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
                    <img src={user.avatar} alt={user.name} className='user-avatar'/>
                    <span className='user-name'>{user.name}</span>
                        
                    </button>

                    {/*Droped when shown own menu */}


                    {showUserDropdown && (
                        <div className='user-dropdown'>
                            <div className='dropdown-header'>
                                <img src={user.avatar} alt={user.name}
                                 className='dropdown-avatar'/>
                                <div className='dropdown-user-info'>
                                    <div className='dropdown-user-name'>{user.name}</div>
                                    <div className='dropdown-user-email'>{user.email}</div>
                                </div>
                    
                            </div>

                            <link to = '/profile' className='dropdown-item'>

                            <image className = 'dropdown-icon' src = '/src/assets/pfp.png'/>
                            Profile
                            </link>
                            <link to ='/booking' className='dropdown-item'>
                            <image src = '/src/assets/booking.png' className='dropdown-icon'/>
                            My Bookings
                            </link>
                            <link to = '/reviews' className='dropdown-item'>
                            <image src = '/src/assets/reviews' className='dropdown-icon'/>
                              Reviews

                            </link>
                            

                      

                        </div>
                    )}
                  
                    
                    
                </div>

            )}
          </div>
            </div>
        </div>
    </nav>
  );
};
  export default NavBar