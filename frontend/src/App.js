import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import LoadingSpinner from './components/LoadingSpinner';
import { StateProvider } from './context/StateContext';

// Lazy load components
const LazyShop = lazy(() => import('./pages/shop/shop'));
const LazyCart = lazy(() => import('./pages/cart/cart'));
const LazyLogIn = lazy(() => import('./cred/Login'));
const LazySignUp = lazy(() => import('./cred/Signup'));

function NavbarWrapper() {
  const location = useLocation();

  return (location.pathname === '/' || location.pathname === '/cart') && <Navbar />;
}

function App() {
  return (
    <StateProvider>
      <Router>
        <div className="App">
          <NavbarWrapper />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/login" element={<LazyLogIn />} />
              <Route path="/signup" element={<LazySignUp />} />
              <Route path="/cart" element={<LazyCart />} />
              <Route path="/" element={<LazyShop />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
