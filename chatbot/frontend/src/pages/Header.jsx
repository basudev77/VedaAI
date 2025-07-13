import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header({ isLoggedIn, handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-green-700 text-white px-4 py-2 rounded-md font-medium"
      : "text-gray-600 hover:text-green-700 font-medium transition-colors";

  return (
    <header className="w-full bg-white shadow">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-700">VedaAI</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          {!isLoggedIn && (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClass}>
                Register
              </NavLink>
            </>
          )}

          <NavLink to="/chat" className={navLinkClass}>
            Launch Chat
          </NavLink>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors cursor-pointer"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-green-700 text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-4 px-6 pb-4">
          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          {!isLoggedIn && (
            <>
              <NavLink
                to="/login"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}

          <NavLink
            to="/chat"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Launch Chat
          </NavLink>

          {isLoggedIn && (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors cursor-pointer"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
