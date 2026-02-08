import { useState } from "react";
import axios from "axios";
import "./UserProfile.css";

const BASE_URL = "http://localhost:3000/api/input";

const UserProfile = () => {
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
      const res = await axios.post(`${BASE_URL}/userprofile`, form);
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
