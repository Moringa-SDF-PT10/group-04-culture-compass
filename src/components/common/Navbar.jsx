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
    
  )