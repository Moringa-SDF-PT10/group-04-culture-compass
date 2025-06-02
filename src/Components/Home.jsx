
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
   
        return (
          <div className="home">
            <div className="hero">
              <h1 className="title">
                Discover Cultures Around the World
              </h1>
              <p className="subtitle">
                Explore different countries, learn about their cultures, traditional cuisines, 
                and plan your next cultural adventure.
              </p>
              <Link to="/login" className="btn-primary">
                Start Exploring
              </Link>
              <br>
              </br>
                 <Link to="/signup" className='sign-up'>Sign Up</Link>
            
            </div>
            
            <div className="features">
              <div className="feature">
                <div className="icon"><img src='/public/assets/diversity.png'/></div>
                <h3 className="feature-title">Rich Cultures</h3>
                <p className="feature-text">Discover traditions, languages, and customs from around the globe</p>
              </div>
              <div className="feature">
                <div className="icon"><img src='/public/assets/cuisine.png'/></div>
                <h3 className="feature-title">Traditional Cuisine</h3>
                <p className="feature-text">Explore authentic dishes and culinary traditions of each country</p>
              </div>
              <div className="feature">
                <div className="icon"><img src='/public/assets/booking.png'/></div>
                <h3 className="feature-title">Plan Your Trip</h3>
                <p className="feature-text">Book cultural experiences and create lasting memories</p>
              </div>
            </div>
          </div>
        )
      }

