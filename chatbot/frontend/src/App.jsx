import React, { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Login from "./pages/login";
import Home from "./pages/home";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on first render
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/getme", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="h-screen w-screen">
      <header className="h-[10%] w-full bg-gradient-to-r from-blue-300 to-blue-500 flex items-center justify-between px-8 shadow-md">
        <h1 className="bg-blue-600 h-10 px-4 text-white rounded-full flex justify-center items-center font-semibold tracking-wide">
          LOGO
        </h1>
        <nav className="flex items-center gap-10">
          <Link
            to="/"
            className="text-white hover:text-blue-100 font-medium transition-colors"
          >
            Home
          </Link>

          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="text-white hover:text-blue-100 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-blue-100 font-medium transition-colors"
              >
                Register
              </Link>
            </>
          )}

          <Link
            to="/chat"
            className="text-white hover:text-blue-100 font-medium transition-colors"
          >
            Chat
          </Link>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-1 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
