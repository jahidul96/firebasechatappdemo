
import React, { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import AuthPage from './pages/AuthPage';
import Loading from './components/Loading';




export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false)
    });
  }, []);
  return (
    <BrowserRouter>

      {
        loading ? <Loading /> :
          user ? <Routes>
            <Route path="/" element={<Home />} />
          </Routes> : <Routes>
            <Route path="/" element={<AuthPage />} />
          </Routes>
      }
    </BrowserRouter>
  )
}

