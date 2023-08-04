import React, { useEffect, useState } from 'react';
import './App.css';
import { MinimalNav } from './components/MinimalNav';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { getAllRoutes, getRoutePath } from './utils/Routes';
import { RoutesName } from './interfaces/Routes.interface';
import { auth } from './config/firebase';
import { AuthRoute } from './modules/AuthRoute';

function App() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                console.log('User detect');
            }else{
                console.log('No user detected');
            }
            setLoading(false);
        })
    }, []);

    const isBackgroundPage = () => {
        return location.pathname.includes('login') || location.pathname.includes('register');
    }
    if (loading) return <div>Loading...</div>

  return (
      <div className={`h-screen w-screen bg-jet p-4 text-silver ${isBackgroundPage() ? 'bg-cover bg-[url(https://picsum.photos/id/63/800/800?grayscale&blur=3)]' : '' }`} >
          <div className='mb-16'>
              <MinimalNav />
          </div>
          <Routes>
              {
                  getAllRoutes().map((route, index) => (
                      <Route key={index} path={route.path} element={
                          route.component ?
                              route.protected ? <AuthRoute> <route.component /> </AuthRoute> :
                                  <route.component />
                              : <Navigate to={getRoutePath(RoutesName.LOGIN)} replace />
                      } />
                  ))
              }
          </Routes>
      </div>
  );
}

export default App;
