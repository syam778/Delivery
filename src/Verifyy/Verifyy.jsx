/*
import React, { useState } from "react";
import axios from "axios";
import "./Verifyy.css";
import { input } from "../assets/output";
import { useNavigate } from "react-router-dom";

const Verifyy = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    setUserData(null);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/input/verify",
        formData
      );

      // ✅ check if backend returned success
      if (res.data.success) {
        setMessage("✅ User verified successfully");
        setUserData(res.data.user);

        // ✅ only navigate if verified
        setTimeout(() => {
          navigate("/sidebar");
        }, 1500);
      } else {
        setMessage("❌ User not found or wrong data");
        // ❌ DO NOT navigate
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Verification failed");
      // ❌ DO NOT navigate
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Verify User</h2>
      <form onSubmit={handleVerify} style={{ marginBottom: "1rem" }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginRight: "1rem" }}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        
        <button type="submit" style={{ marginLeft: "1rem" }}>
          Verify
        </button>
      </form>
      {message && (
  <p className={message.includes("✅") ? "success-msg" : "error-msg"}>
    {message}
  </p>
)}


      {message && <p>{message}</p>}

      {userData && (
        <div className="data">
          <h3>User Data:</h3>
          <p><strong>Full Name:</strong> {userData.fullName}</p>
          <p><strong>Store Name:</strong> {userData.storeName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Street:</strong> {userData.street}</p>

          <p>
            {userData.linkdata ? (
              <a
                href={userData.linkdata}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className='marker1' src={input.admin} alt="" />
                View Map
              </a>
            ) : (
              "No Map"
            )}
          </p>

          <p><strong>Gender:</strong> {userData.gender}</p>
          <p><strong>City:</strong> {userData.city}</p>
        </div>
      )}
    </div>
  );
};

export default Verifyy;
*/

import React, {  useContext, useState, } from "react";
import axios from "axios";
import "./Verifyy.css";
import { useNavigate } from "react-router-dom";
import { DelContext } from "../DelContext/DelContext";



const Verifyy = () => {
  const navigate = useNavigate();
  const { url } = useContext(DelContext);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    storeName: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${url}/api/input/verify`,
        formData
      );

      if (res.data.success) {
        setMessage("✅ User verified successfully");

        // move to dashboard / sidebar
        setTimeout(() => {
          navigate("/sidebar");
        }, 1000);
      } else {
        setMessage("❌ User data does not match");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <h2>Verify User</h2>

      <form onSubmit={handleVerify} className="verify-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="storeName"
          placeholder="Store Name"
          value={formData.storeName}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {message && <p className="verify-message">{message}</p>}
    </div>
  );
};

export default Verifyy;
