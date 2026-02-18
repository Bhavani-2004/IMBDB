import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        background: "linear-gradient(135deg, #7f00ff, #e100ff)",
        padding: "10px 20px",
      }}
    >
      {/* ✅ Brand / Logo */}
      <Link
        to="/home"
        className="navbar-brand fw-bold text-white"
        style={{ fontSize: "1.4rem", letterSpacing: "1px" }}
      >
        🎬 The Movies Hub
      </Link>

      {/* Toggle Button for Mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* ✅ Navbar Links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <Link className="nav-link text-white fw-semibold mx-2" to="/home">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white fw-semibold mx-2" to="/movies">
              Movies
            </Link>
          </li>

          {/* 🔒 If NOT logged in */}
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link text-white fw-semibold mx-2"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white fw-semibold mx-2"
                  to="/user-register"
                >
                  Register
                </Link>
              </li>
            </>
          )}

          {/* 🔓 If logged in */}
          {isAuthenticated && (
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-white fw-semibold mx-2"
                to="#"
                id="userMenu"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My Account ⬇️
              </Link>

              <ul
                className="dropdown-menu dropdown-menu-end shadow-sm"
                aria-labelledby="userMenu"
                style={{ borderRadius: "10px" }}
              >
                <li>
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/get-profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item text-danger fw-semibold"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
