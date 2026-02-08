import React, { useContext } from "react";
import "./Home.css";
import { input } from "../assets/output";
import { useNavigate } from "react-router-dom";
import { DelContext } from "../DelContext/DelContext";

const Home = () => {
  const { url } = useContext(DelContext);
  const navigate = useNavigate();

  // ✅ login check
  const token = localStorage.getItem("token");

  // ✅ delivery data check
  const deliveryCreated = localStorage.getItem("deliveryCreated");

  return (
    <div className="home">
      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-left">
          <h1>
            Fast <span>Food Delivery</span> <br /> Near You
          </h1>
          <p>
            Order food from your favourite restaurants and get it delivered
            fresh & fast at your doorstep.
          </p>

          {/* ✅ SHOW CREATE ONLY IF LOGGED IN */}
          {token && (
            <button className="btn" onClick={() => navigate("/create")}>
              Create user
            </button>
          )}

          {/* ✅ SHOW VERIFY ONLY IF DELIVERY DATA EXISTS */}
          {deliveryCreated && (
            <div className="nextpage">
              <p>
                You already submitted data. <b>Verify your data</b>
              </p>
              <button
                className="nextbtn"
                onClick={() => navigate("/verify")}
              >
                Verify
              </button>
            </div>
          )}
        </div>

        <div className="hero-right">
          <img src={input.speed || "/speed.png"} alt="delivery" />
        </div>
      </div>

      {/* FEATURES */}
      <div className="features">
        <div className="feature-card">
          <h3>⚡ Fast Delivery</h3>
          <p>Get your food in under 30 minutes</p>
        </div>
        <div className="feature-card">
          <h3>🍔 Best Quality</h3>
          <p>Fresh and hygienic food always</p>
        </div>
        <div className="feature-card">
          <h3>💳 Easy Payment</h3>
          <p>Cash on delivery & online payment</p>
        </div>
      </div>
    </div>
  );
};

export default Home;









/*import React from "react";
import "./Home.css";
import { input } from "../assets/output";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DelContext } from "../DelContext/DelContext";

const Home = () => {
  const { url } = useContext(DelContext);
  const navigate = useNavigate();

  // ✅ login check
  const token = localStorage.getItem("token");

  return (
    <div className="home">
      {/* HERO SECTION *
      <div className="hero">
        <div className="hero-left">
          <h1>
            Fast <span>Food Delivery</span> <br /> Near You
          </h1>
          <p>
            Order food from your favourite restaurants and get it delivered
            fresh & fast at your doorstep.
          </p>

          {/* ✅ SHOW ONLY IF USER LOGGED IN *
          {token && (
            <button
              className="btn"
              onClick={() => navigate("/create")}
            >
              Create user
            </button>
          )}

          <div className="nextpage">
            <p>
              You Are Already Submit Data You Go <b>Verify Your Data</b>
            </p>
            <button
              className="nextbtn"
              onClick={() => navigate("/verify")}
            >
              Verify
            </button>
          </div>
        </div>

        <div className="hero-right">
          <img
            src={input.speed || "/speed.png"}
            alt="delivery"
          />
        </div>
      </div>

      {/* FEATURES *
      <div className="features">
        <div className="feature-card">
          <h3>⚡ Fast Delivery</h3>
          <p>Get your food in under 30 minutes</p>
        </div>
        <div className="feature-card">
          <h3>🍔 Best Quality</h3>
          <p>Fresh and hygienic food always</p>
        </div>
        <div className="feature-card">
          <h3>💳 Easy Payment</h3>
          <p>Cash on delivery & online payment</p>
        </div>
      </div>
    </div>
  );
};

export default Home;









/*import React from "react";
import "./Home.css";
import { input } from "../assets/output";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DelContext } from "../DelContext/DelContext";


const Home = () => {
  const {url} = useContext(DelContext);
  const navigate = useNavigate();
  return (
    <div className="home">
      {/* HERO SECTION *
      <div className="hero">
        <div className="hero-left">
          <h1>
            Fast <span>Food Delivery</span> <br /> Near You
          </h1>
          <p>
            Order food from your favourite restaurants and get it delivered
            fresh & fast at your doorstep.
          </p>

          <button className="btn" onClick={() => navigate("/create")} >Create user</button>
          <div className="nextpage">
            <p>You Are Alredy Submit Data You Goo <b>Verify Your Data</b></p>
            <button className="nextbtn" onClick={() => navigate("/verify")} >Verify</button>
          </div>
                
        </div>

        <div className="hero-right">
          <img
            src={input.speed|| "/speed.png"}
            alt="delivery"
          />
        </div>
      </div>

      {/* FEATURES *
      <div className="features">
        <div className="feature-card">
          <h3>⚡ Fast Delivery</h3>
          <p>Get your food in under 30 minutes</p>
        </div>
        <div className="feature-card">
          <h3>🍔 Best Quality</h3>
          <p>Fresh and hygienic food always</p>
        </div>
        <div className="feature-card">
          <h3>💳 Easy Payment</h3>
          <p>Cash on delivery & online payment</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
*/