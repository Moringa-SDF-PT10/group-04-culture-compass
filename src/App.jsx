import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Components/Home';
import Countries from './Components/Countries';
import CountryDetails from './Components/CountriesDetails';
import LoginForm from './features/authentication/LoginForm';
import SignUpForm from './features/authentication/SignUpForm';

function App() {
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
      <div className="app">
      
        <Navbar />
        
        <main style={{ flex: 1, minHeight: 'calc(100vh - 140px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/country/:id" element={<CountryDetails />} />
            <Route path="/login" element={<LoginForm users={users} setUsers={setUsers} />} />
            <Route path="/signup" element={<SignUpForm users={users} setUsers={setUsers} />} />
          </Routes>
        </main>
        
       
        <Footer />
      </div>
    </Router>
  );
}

export default App;
