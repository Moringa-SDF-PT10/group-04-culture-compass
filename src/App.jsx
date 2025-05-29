import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Countries from './Components/Countries'

function App() {

  return (
    <>
    <div className="app-container">
        <nav className="app-nav">
          <Link to={"/Countries"}>Countries</Link>
        </nav>
        <main className="app-main">
          <Routes>
            <Route path='/Countries' element={<Countries/>} />
          </Routes>
        </main>
        </div>
</>
  )
}

export default App