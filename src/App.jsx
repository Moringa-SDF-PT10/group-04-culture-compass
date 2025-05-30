import './App.css'
import LoginForm from './features/authentication/LoginForm'
import SignUpForm from './features/authentication/SignUpForm'

import { Link, Routes, Route } from 'react-router-dom'
import Reviews from './features/reviews/Reviews'

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
    <>
      <SignUpForm users={users} setUsers={setUsers} />
    <div className="app-container">
        <nav className="app-nav">
          <Link to={"/Reviews"}>Reviews</Link>
        </nav>
        <main className="app-main">
          <Routes>
            <Route path='/Reviews' element={<Reviews/>} />
          </Routes>
        </main>
      </div>
      
    </>
  )
}

export default App
