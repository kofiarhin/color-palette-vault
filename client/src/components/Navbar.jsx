import "./navbar.styles.scss";
import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
  FaUserPlus,
  FaPalette,
} from "react-icons/fa";
import { GiPaintBrush } from "react-icons/gi";
import { BsPaletteFill } from "react-icons/bs";

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
        <span className="icon" aria-hidden="true">
          <FaPalette />
        </span>
        <span className="brand-text">Color Palette Vault</span>
      </Link>
      <button
        className="burger"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>
      <ul className={open ? "nav-links open" : "nav-links"}>
        <li>
          <NavLink
            to="/"
            end
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon" aria-hidden="true">
              <FaHome />
            </span>
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/palettes"
            end
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon" aria-hidden="true">
              <BsPaletteFill />
            </span>
            Palettes
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to="/about"
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon" aria-hidden="true">
              <FaInfoCircle />
            </span>
            About
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/login"
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon" aria-hidden="true">
              <FaSignInAlt />
            </span>
            Login
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink
            to="/register"
            onClick={handleLinkClick}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon" aria-hidden="true">
              <FaUserPlus />
            </span>
            Register
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
