import React from 'react';
import './App.css';
import { MinimalNav } from './components/MinimalNav';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage } from './pages/Login';

function App() {
    const location = useLocation();
  return (
      <div className={`h-screen w-screen bg-jet p-4 text-silver ${location.pathname.includes('login') ? 'bg-cover bg-[url(https://picsum.photos/id/63/800/800?grayscale&blur=3)]' : '' }`} >
          <div className='mb-16'>
              <MinimalNav />
          </div>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
          </Routes>
      </div>
  );
}

export default App;
