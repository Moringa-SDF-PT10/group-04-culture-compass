import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { Route} from 'react-router-dom'
import { MemoryRouter as Router } from "react-router-dom";
import Home from './Components/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <App/>
  
  </StrictMode>,
)
