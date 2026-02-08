/*import { useState } from "react";
import axios from "axios";
import "./DelBoyProfile.css";

const BASE_URL = "http://localhost:3000/api/delboy";

const DelBoyProfile = () => {
  const [input, setInput] = useState(""); // Gmail or UserSpecialId
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // fetch profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setProfile(null);

    if (!input) {
      setMessage("Please enter Gmail or UserSpecialId");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/profile`, {
        gmail: input, // or userSpecialId: input
      });

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
    <div className="delboy-profile">
      <h2>Search DelBoy Profile</h2>

      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          placeholder="Enter Gmail or UserSpecialId"
          value={input}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {message && <p className="msg">{message}</p>}

      {profile && (
        <div className="profile-card">
          <h3>{profile.name}</h3>
          <p><strong>Number:</strong> {profile.number}</p>
          <p><strong>Gmail:</strong> {profile.gmail}</p>
          <p><strong>Special ID:</strong> {profile.userSpecialId}</p>
          <p><strong>Vehicle:</strong> {profile.vehicle}</p>
          <p><strong>Status:</strong> {profile.status === "online" ? "🟢 Online" : "🔴 Offline"}</p>
        </div>
      )}
    </div>
  );
};

export default DelBoyProfile;*/




import { useState } from "react";
import axios from "axios";
import "./DelBoyProfile.css"
import { input } from "../../assets/output";

const BASE_URL = "http://localhost:3000/api/input";

const DelBoyProfile = () => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
  });

  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const getUserData = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        `${BASE_URL}/createdelprofileuser`,
        form
      );

      if (res.data.success) {
        setUserData(res.data.userData); // ✅ FULL USER DATA
      /*if (res.data.success) {
        console.log("USER FROM API:", res.data.userData);
        navigate("/delorder", {
          state: { userData: res.data.userData },
        });
      }*/
      }
    else {
      setMessage(res.data.message);
    }
  } catch (error) {
    setUserData(null);
    setMessage(
      error.response?.data?.message || "User not found"
    );
  }
};

return (
  <div style={{ maxWidth: "500px", margin: "auto" }}>
    <h2>User Verification</h2>

    {/* Input Email & Phone */}
    <form onSubmit={getUserData}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <button type="submit">Get User Data</button>
    </form>

    {message && <p style={{ color: "red" }}>{message}</p>}

    {/* Display FULL USER DATA  <p><b>ID:</b> {userData._id}</p> 
      {userData && (
        <div style={{ marginTop: "20px" }}>
          <h3>User Profile</h3>

          <p><b>Full Name:</b> {userData.fullName}</p>
          <p><b>Email:</b> {userData.email}</p>
          <p><b>Phone:</b> {userData.phone}</p>
          <p><b>Address:</b> {userData.address}</p>
          <p><b>Pincode:</b> {userData.zipcode}</p>
          <p><b>Gender:</b> {userData.gender}</p>
          <p><b>Your Location:</b>
            {userData.linkdata ? (
              <a
                href={userData.linkdata}
                target="_blank"
                rel="noopener noreferrer"
              ><img className='marker1' src={input.admin} alt="" />
                View Map
              </a>
            ) : (
              "No Map"
            )}
          </p>
          <p><b>Pincode:</b> {userData.zipcode}</p>
          <p><b>Street:</b> {userData.street}</p>
          <p><b>Age:</b> {userData.age}</p>
          <p><b>Store Name:</b> {userData.storeName}</p>
          <p><b>Created At:</b> {new Date(userData.createdAt).toLocaleString()}</p>
        </div>
      )} */}


    {userData && (
      <div className="user-profile">
        <h3>User Profile</h3>

        <p><b>Full Name:</b> {userData.fullName}</p>
        <p><b>Email:</b> {userData.email}</p>
        <p><b>Phone:</b> {userData.phone}</p>
        <p><b>Address:</b> {userData.address}</p>
        <p><b>Pincode:</b> {userData.zipcode}</p>
        <p><b>Gender:</b> {userData.gender}</p>

        <p>
          {userData.linkdata ? (
            <a href={userData.linkdata} target="_blank" rel="noopener noreferrer">
              <img className="marker1" src={input.admin} alt="map" />
              View Map
            </a>
          ) : (
            "No Map"
          )}
        </p>

        <p><b>Street:</b> {userData.street}</p>
        <p><b>Age:</b> {userData.age}</p>
        <p><b>Store Name:</b> {userData.storeName}</p>
        <p><b>Created At:</b> {new Date(userData.createdAt).toLocaleString()}</p>
      </div>
    )}

  </div>
);
};

export default DelBoyProfile;

