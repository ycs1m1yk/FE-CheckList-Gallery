import React, { createContext, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/home/Home';
import Gallery from './components/gallery/Gallery';
import Detail from './components/gallery/Detail';
import Publish from './components/publish/Publish';
import AuthCallback from './components/auth/AuthCallback';

export const LoginContext = createContext(null);

function App() {
  const [token, setToken] = useState(false);
  const tokens = useMemo(() => ({ token, setToken }), [setToken]);
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, []);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <LoginContext.Provider value={tokens}>
        <Header isLogin={isLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/callback' element={<AuthCallback />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/gallery/:postId' element={<Detail />} />
          <Route path='/publish' element={<Publish />} />
        </Routes>
        <Footer />
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
