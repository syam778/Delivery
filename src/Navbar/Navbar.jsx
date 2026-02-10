
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { input } from "../assets/output";
import { DelContext } from "../DelContext/DelContext";

const Navbar = ({ setShowLogin }) => {
  const { token, setToken } = useContext(DelContext); // ✅ FIX
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/")
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <img src={input.speed} alt="logo" className="logo-img" />

        {/* LINKS */}
        <div className={`nav-links ${open ? "active" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/userprofilenano"> Your Order</Link>
          <Link to="/verify">Profile</Link>
          <Link to="/condition">Condition</Link>

          {/* AUTH BUTTON */}
          {!token ? (
            <button onClick={() => setShowLogin(true) || navigate("/login")}>Login</button>
          ) : (
            <div className='navbar-profile' >
              <img src={input.admin} alt="" />
              <ul className='nav-profile-down'>
                <li onClick={() =>navigate("/delivery/history")}><img src={input.speed} alt="" /><p>All Orders</p></li>
                <hr className='more' />
                <li onClick={logoutHandler} ><img src={input.admin} alt="" /><p>Logout</p></li>

                <li onClick={() => navigate("/createdelprofileuser")} >
                  <img src={input.admin} alt="" />
                  <p>DelBoyProfile</p>
                </li>
                <li onClick={() => navigate("/userprofile")} >
                  <img src={input.admin} alt="" />
                  <p>UserProfile</p>
                </li>
                <li onClick={() => navigate("/totalorderlist")} >
                  <img src={input.admin} alt="" />
                  <p>All Order Data</p>
                </li>

                <hr className='more' />

              </ul>
            </div>
          )}
        </div>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


