/*import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { input } from "../assets/output"; 
// input.logo , input.home , input.admin (example)

const Navbar = ({ setShowLogin }) => {
  const [open, setOpen] = useState(false);
  
    
  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LEFT : LOGO *
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img src={input.speed} alt="Logo" />
          <span>Delivery</span>
        </Link>

        {/* CENTER : LINKS *
        <div className="Navroll">
          <Link to="/" onClick={() => setOpen(false)}>
            <img src={input.home} alt="" />
            Home
          </Link>

          <Link to="/menu" onClick={() => setOpen(false)}>
            Menu
          </Link>

          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>
        </div>
        


        {/* RIGHT : ADMIN *
        {!token ? (
  <Link to="/login"><button onClick={() => setShowLogin(true)}>sing in</button></Link>
) : (
 <Link to="/admin" className="admin" onClick={() => setOpen(false)}>
          <img src={input.admin} alt="Admin" />
        </Link>
)}

        {/* MOBILE HAMBURGER <div className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </div> *
        

      </div>
    </nav>
  );
};

export default Navbar;



<Link to="/admin" className="admin" onClick={() => setOpen(false)}>
          <img src={input.admin} alt="Admin" />
        </Link>


{!token ? <button onClick={() => setShowLogin(true)}>sing in</button>
                    : <div className='navbar-profile' >
                        <img src={photo.admin} alt="" />
                        <ul className='nav-profile-down'>
                            <li onClick={() => navigate("/my-order")}><img src={photo.bocket} alt="" /><p>Orders</p></li>
                            <hr className='more' />
                            <li onClick={logout} ><img src={photo.bike} alt="" /><p>Logout</p></li>

                            <li onClick={() => navigate("/my-data")} >
                                <img src={photo.admin} alt="" />
                                <p>Profile</p>
                            </li>

                            <hr className='more' />

                        </ul>
                    </div>
*/
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


/*
.navbar {
  width: 100%;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* LOGO *
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.logo img {
  width: 40px;
  height: 40px;
}

.logo span {
  font-size: 20px;
  font-weight: 700;
  color: #ff5722;
}

/* LINKS *
.nav-links {
  display: flex;
  gap: 25px;
  align-items: center;
}

.nav-links a {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav-links img {
  width: 18px;
  height: 18px;
}

/* ADMIN *
.admin img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #ff5722;
  padding: 2px;
  cursor: pointer;
}

/* HAMBURGER *
.hamburger {
  display: none;
  font-size: 26px;
  cursor: pointer;
}
.Navroll{
    color: black;
    gap: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: blue;
    font-size: large;
}
.Navroll a{
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

/* MOBILE *
@media (max-width: 768px) {
  .nav-links {
    position: absolute;
    top: 65px;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    gap: 15px;
    padding: 20px 0;
    display: none;
  }

  .nav-links.active {
    display: flex;
  }

  .hamburger {
    display: block;
  }
  .admin img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ff5722;
  padding: 2px;
  cursor: pointer;
}
.Navroll{
    color: black;
    gap: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: blue;
    font-size: small;
}
.Navroll a{
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
}
}
*/