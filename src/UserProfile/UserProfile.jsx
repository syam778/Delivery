/*import { useContext, useState } from "react";
import axios from "axios";
import "./UserProfile.css";
import { DelContext } from "../DelContext/DelContext";

const UserProfile = () => {
  const {url} = useContext(DelContext)
  const [form, setForm] = useState({ email: "", phone: "" });
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setProfile(null);

    if (!form.email || !form.phone) {
      setMessage("Email and phone are required");
      return;
    }

    try {
      const res = await axios.post(`${url}/api/input/userprofile`, form);
      if (res.data.success) {
        setProfile(res.data.data);
        setMessage(res.data.message);
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error ❌");
    }
  };

  return (
    <div className="user-profile">
      <h2>Find User Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <input className="userprofile"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input className="userprofile"
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {message && <p className="msg">{message}</p>}

      {profile && (
        <div className="profile-card">
          <h3>{profile.fullname || "User"}</h3>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          {profile.storeName && <p><strong>Store Name:</strong> {profile.storeName}</p>}
          {profile.age && <p><strong>Age:</strong> {profile.age}</p>}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
*/
import React, { useState, useContext } from "react";
import axios from "axios";
import "./UserProfile.css";
import { DelContext } from "../DelContext/DelContext";

const UserProfile = () => {
  const { url } = useContext(DelContext);

  const [form, setForm] = useState({
    email: "",
    phone: "",
  });

  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setProfile(null);
    setLoading(true);

    try {
      const res = await axios.post(
        `${url}/api/delboy/userProfile`,
        {
          email: form.email,
          phone: form.phone,
        }
      );

      if (res.data.success) {
        setProfile(res.data.data);
        setMessage("✅ User found");
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
        "❌ User not found"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-profile">
      <h2>Find User Profile</h2>

      <form onSubmit={handleSubmit} className="profile-form">
        <input
          className="userprofile"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="userprofile"
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {message && (
        <p
          className="msg"
          style={{
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}

      {profile && (
  <div className="profile-card">
    <h3>Delivery Boy Details</h3>

    <p>
      <strong>Name:</strong> {profile.name}
    </p>

    <p>
      <strong>Gmail:</strong> {profile.gmail}
    </p>

    <p>
      <strong>Number:</strong> {profile.number}
    </p>

    <p>
      <strong>User Special ID:</strong> {profile.userSpecialId}
    </p>

    <p>
      <strong>Vehicle:</strong> {profile.vehicle}
    </p>

    <p>
      <strong>Online:</strong> {profile.isOnline ? "Yes" : "No"}
    </p>

    <p>
      <strong>Active:</strong> {profile.isActive ? "Yes" : "No"}
    </p>

    <p>
      <strong>Last Seen:</strong>{" "}
      {profile.lastSeen
        ? new Date(profile.lastSeen).toLocaleString()
        : "N/A"}
    </p>
  </div>
)}
    </div>
  );
};

export default UserProfile;