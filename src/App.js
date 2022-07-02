
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




export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <BrowserRouter>
      {
        user ? <Routes>
          <Route path="/" element={<Home />} />
        </Routes> : <Routes>
          <Route path="/" element={<AuthPage />} />
        </Routes>
      }
    </BrowserRouter>
  )
}

