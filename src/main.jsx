
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
   
    <BrowserRouter>
      <div className="app">
        
        <Navbar />
        <main style={{ flex: 1, minHeight: 'calc(100vh - 140px)' }}>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;