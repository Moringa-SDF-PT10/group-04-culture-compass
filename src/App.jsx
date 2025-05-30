import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './features/authentication/LoginForm'
import SignUpForm from './features/authentication/SignUpForm'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Countries from './Components/Countries'
import CountryDetails from './Components/CountriesDetails'

function App() {
  //Users array for authentication
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Hugh Jazz',
      email: 'Jazz@example.com',
      password: '12345',
      isLoggedin: 'false',
    },
    {
      id: 2,
      name: 'Michael Joseph',
      email: 'aoinihonjin@gmail.com',
      password: '12345',
      isLoggedin: 'false',
    }
  ]);

  return (
    <Router>
      <div className="app" id="main">
        {/* Navigation */}
        <nav className="navbar" id="navbar">
          <div className="container">
            <div className="nav">
              <Link to="/" className="logo">
                🌍 Cultural Explorer
              </Link>
              <div className="menu">
                <Link 
                  to="/countries" 
                  className="link"
                >
                  Countries
                </Link>
                <Link 
                  to="/login" 
                  className="button"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/country/:id" element={<CountryDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

const Home = () => {
  return (
    <>
      <SignUpForm users={users} setUsers={setUsers} />
    </>
    <div className="container" id="home">
      <div className="center">
        <h1 className="title">
          Discover Cultures Around the World
        </h1>
        <p className="subtitle">
          Explore different countries, learn about their cultures, traditional cuisines, 
          and plan your next cultural adventure.
        </p>
        <Link 
          to="/countries"
          className="button main"
        >
          Start Exploring
        </Link>
      </div>
      
      <div className="features">
        <div className="feature">
          <div className="icon">🏛️</div>
          <h3 className="title">Rich Cultures</h3>
          <p className="text">Discover traditions, languages, and customs from around the globe</p>
        </div>
        <div className="feature">
          <div className="icon">🍜</div>
          <h3 className="title">Traditional Cuisine</h3>
          <p className="text">Explore authentic dishes and culinary traditions of each country</p>
        </div>
        <div className="feature">
          <div className="icon">✈️</div>
          <h3 className="title">Plan Your Trip</h3>
          <p className="text">Book cultural experiences and create lasting memories</p>
        </div>
      </div>
    </div>
  )
}

const Login = () => {
  return (
    <div className="container" id="login">
      <div className="form">
        <h2 className="title">Login</h2>
        <form className="loginform">
          <div className="field">
            <label className="label">
              Email
            </label>
            <input 
              id="email"
              type="email" 
              className="input"
              placeholder="Enter your email"
            />
          </div>
          <div className="field">
            <label className="label">
              Password
            </label>
            <input 
              id="password"
              type="password" 
              className="input"
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit"
            className="button submit"
          >
            Login
          </button>
        </form>
        <p className="footer">
          Don't have an account? <Link to="/register" className="link">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default App
