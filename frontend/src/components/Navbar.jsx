import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer";

function Navbar() {
  let cartState = useCart();
  let navigate = useNavigate();
  let token = localStorage.getItem("authToken");

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          myFood
        </Link>
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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            {/* ✅ Show "My Orders" only if logged in */}
            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/myorders">
                  My Orders
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex">
            {!token ? (
              <>
                <Link to="/login" className="btn btn-primary me-2">
                  Log in
                </Link>
                <Link to="/signup" className="btn btn-success">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/cart" className="btn btn-info me-2">
                  Cart {cartState.length ? `(${cartState.length})` : ""}
                </Link>
                <button onClick={logout} className="btn btn-danger">
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
