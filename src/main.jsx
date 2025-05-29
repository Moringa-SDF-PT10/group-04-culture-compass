import { StrictMode } from 'react'
import { createRoot, ReactDOM } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <App />
    {/* <TestReviewForm/>
    <ReviewCardTest/> */}
    </Router>
  </StrictMode>,
)