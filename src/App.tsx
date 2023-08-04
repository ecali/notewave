import React from 'react';
import './App.css';
import { MinimalNav } from './components/MinimalNav';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { getAllRoutes, getRoutePath } from './utils/Routes';
import { RoutesName } from './interfaces/Routes.interface';

function App() {
    const location = useLocation();

    const isBackgroundPage = () => {
        return location.pathname.includes('login') || location.pathname.includes('register');
    }

  return (
      <div className={`h-screen w-screen bg-jet p-4 text-silver ${isBackgroundPage() ? 'bg-cover bg-[url(https://picsum.photos/id/63/800/800?grayscale&blur=3)]' : '' }`} >
          <div className='mb-16'>
              <MinimalNav />
          </div>
          <Routes>
              {
                  getAllRoutes().map((route, index) => (
                      <Route key={index} path={route.path} element={route.component ? <route.component /> : <Navigate to={getRoutePath(RoutesName.LOGIN)} replace />} />
                  ))
              }
              {/*<Route path="/login" element={<LoginPage />} />
              <Route path='*' element={<Navigate to='/login' replace /> } />*/}
          </Routes>
      </div>
  );
}

export default App;
