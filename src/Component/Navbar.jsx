import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { auth } from "../firebase/firebase.config";
import { signOut } from "firebase/auth";
import logo from "../assets/logo.png";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `text-base font-medium hover:text-[#209d50] hover:bg-transparent transition ${
      isActive
        ? "text-[#209d50] relative after:absolute after:left-0 after:-bottom-0 after:w-full after:h-[2px] after:bg-[#209d50]"
        : "text-black"
    }`;

  const links = (
    <>
      <li onClick={() => setMenuOpen(false)}>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li onClick={() => setMenuOpen(false)}>
        <NavLink to="/plants" className={navLinkClass}>
          Plants
        </NavLink>
      </li>

      {user && (
        <li onClick={() => setMenuOpen(false)}>
          <NavLink to="/profile" className={navLinkClass}>
            My Profile
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-white relative shadow-sm">
      <div className="flex justify-between items-center py-6 pr-4 md:pr-0 container mx-auto relative z-50">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden btn bg-white border-0 shadow-none hover:bg-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img className="h-16 w-auto" src={logo} alt="GreenNest Logo" />
          </Link>
        </div>

        <div className="hidden lg:flex items-center">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="dropdown dropdown-end relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full bg-green-100 border border-green-400 overflow-hidden">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co.com/fGMNLM9Z/Sample-User-Icon.png"
                    }
                    alt={user.displayName || "User"}
                  />
                </div>
              </button>

              {dropdownOpen && (
                <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box absolute right-0 mt-3 w-52 p-2 shadow z-50">
                  <li className="font-semibold text-gray-700 px-3 py-2 border-b">
                    {user.displayName || "User"}
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="text-red-600 w-full text-left hover:bg-red-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 border border-[#209d50] text-[#209d50] rounded-lg font-medium hover:bg-[#209d50] hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-[#209d50] text-white rounded-lg font-medium hover:bg-[#157d3e] transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
      {menuOpen && (
        <ul
          ref={menuRef}
          className="menu menu-sm bg-white rounded-box p-2 shadow absolute top-full left-0 w-full lg:hidden z-40"
        >
          {links}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
