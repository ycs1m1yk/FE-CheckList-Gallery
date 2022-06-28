import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from '@components/common/Footer';
import Home from '@components/home/Home';
import Gallery from '@components/gallery/Gallery';
import Detail from '@components/gallery/Detail';
import Publish from '@components/publish/Publish';
import AuthCallback from '@components/auth/AuthCallback';
import Layout from '@components/common/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:postId" element={<Detail />} />
          <Route path="/publish" element={<Publish />} />
        </Route>
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
