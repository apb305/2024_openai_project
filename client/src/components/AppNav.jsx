import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AppNav() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  }

  const authLinks = (
    <Fragment>
      <Link
        className="nav-link dropdown-toggle text-dark"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        My Account
      </Link>
      <div
        className="dropdown-menu dropdown-menu-right border rounded-0 shadow"
        aria-labelledby="navbarDropdownMenuLink"
      >
        <a className="dropdown-item" href="/dashboard">
          Dashboard
        </a>
        <a className="dropdown-item" href="/profile">
          Profile
        </a>
        <Link className="dropdown-item" to="/account-settings">
          Account Settings
        </Link>
        <button className="dropdown-item" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </button>
      </div>
    </Fragment>
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand text-dark" href="/">
            FAQtual
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse flex-grow-0"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown ml-auto">
                {authLinks}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
