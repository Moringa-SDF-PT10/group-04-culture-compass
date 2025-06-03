import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="navbar-content">
             <Link to="/countries" className="nav-link"><img className="brand-logo" src ='/assets/favicon2.png'></img></Link>

          <div className="navbar-links">
         
            <Link to="/reviews" className="nav-link">Reviews</Link>
          </div>

          {/* Dropdown button */}
          <div className="user-menu">
            <button 
              className="user-profile-btn" 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img src="/public/assets/avatar.png" alt="User Avatar" className="user-avatar" />
              <span className="user-name">Menu</span>
            </button>

            {showDropdown && (
              <div className="user-dropdown">
                
                <Link to="/reviews" className="dropdown-item">Reviews</Link>
                <hr className="dropdown-divider" />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;