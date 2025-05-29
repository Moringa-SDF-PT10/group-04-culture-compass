import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Reviews from './features/reviews/Reviews'

function App() {

  return (
    <>
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
