
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return(
      <BrowserRouter>
      <div className="app">
        <Navbar />
        
        <main style={{ flex: 1, minHeight: 'calc(100vh - 140px)' }}>
          <AppRoutes />
        </main>
        <Footer />
=======
import { useState } from 'react'
import './App.css'
import Reviews from './features/reviews/Reviews'
import LoginForm from './features/authentication/LoginForm'
import SignUpForm from './features/authentication/SignUpForm'
import Home from './Components/Home'
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
      isLoggedin: false,
    },
    {
      id: 2,
      name: 'Michael Joseph',
      email: 'aoinihonjin@gmail.com',
      password: '12345',
      isLoggedin: false,
    }
  ]);


  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/countries">Countries</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to={"/Reviews"}>Reviews</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/country/:id" element={<CountryDetails />} />
          <Route path="/login" element={<LoginForm users={users} setUsers={setUsers} />} />
          <Route path="/signup" element={<SignUpForm users={users} setUsers={setUsers} />} />
          <Route path='/Reviews' element={<Reviews/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}



export default App
