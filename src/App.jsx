import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Reviews from './features/reviews/Reviews';
import LoginForm from './features/authentication/LoginForm';
import SignUpForm from './features/authentication/SignUpForm';
import Home from './Components/Home';
import Countries from './Components/Countries';
import CountryDetails from './Components/CountriesDetails';
import NavBar from './components/common/Navbar';
import './index.css';
import Cuisine from "./Components/Cuisine";
import AllCuisinesPage from './Components/AllCuisinesPage';



function App() {
  const location = useLocation();
  const excludedPaths = ['/', '/login', '/signup']; 

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
    <div className="App">
      {}
      {!excludedPaths.includes(location.pathname) && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/country/:id" element={<CountryDetails />} />
        <Route path="/login" element={<LoginForm users={users} setUsers={setUsers} />} />
        <Route path="/signup" element={<SignUpForm users={users} setUsers={setUsers} />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/" element={<Cuisine countryName="CountryName" />} />
<Route path="/cuisines/:countryName" element={<AllCuisinesPage />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
