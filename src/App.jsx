import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './features/authentication/LoginForm'


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
      <LoginForm users={users} />
    </>
  )
}

export default App
