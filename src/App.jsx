import { useState } from 'react'
import Reviews from './features/reviews/Reviews'
import LoginForm from './features/authentication/LoginForm'
import SignUpForm from './features/authentication/SignUpForm'
import Home from './Components/Home'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Countries from './Components/Countries'
import CountryDetails from './Components/CountriesDetails'
// import NavBar from './components/common/Navbar'
import './index.css'
import NavBar from './navbar-test.jsx'
import Cuisine from "./Components/Cuisine";
import AllCuisinesPage from './components/AllCuisinesPage';

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
        {location.pathname !== "/" && <NavBar />}

        

        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/country/:id" element={<CountryDetails />} />
          <Route path="/login" element={<LoginForm users={users} setUsers={setUsers} />} />
          <Route path="/signup" element={<SignUpForm users={users} setUsers={setUsers} />} />
          <Route path='/Reviews' element={<Reviews/>} />
          <Route path="/" element={<Cuisine countryName="Italy" />} />
        <Route path="/cuisines/:countryName" element={<AllCuisinesPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App