import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.styles.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Color Palette Vault
      </Link>
      <button
        className="burger"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
      <ul className={open ? "nav-links open" : "nav-links"}>
        <li>
          <NavLink
            to="/"
            end
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
