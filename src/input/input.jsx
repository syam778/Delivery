/*import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";

import "./input.css"
import { DelContext } from "../DelContext/DelContext";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const navigate = useNavigate();
  const { url, doneAudio, submitAudio, wonAudio, addAudio, timeAudio, } = useContext(DelContext);
  const [data, setData] = useState({
    storeName: "",
    fullName: "",
    email: "",
    city: "",
    linkdata: "",
    zipcode: "",
    address: "",
    street: "",
    phone: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(url + "/api/input/create", data);

    // 🚨 VERY IMPORTANT CHECK
    if (!res.data.success) {
      alert("User not created ❌");
      return;
    }

    alert("User created successfully ✅");
    wonAudio.play();

    // ✅ go to verify ONLY if user exists
    navigate("/verify", {
      state: {
        email: res.data.email,
        phone: res.data.phone,
        userId: res.data.userId,
      },
    });

    // clear form
    setData({
      storetName: "",
      fullName: "",
      email: "",
      city: "",
      linkdata: "",
      zipcode: "",
      address: "",
      street: "",
      phone: "",
      age: "",
      gender: "",
    });

  } catch (error) {
    console.error(error);
    alert("User not found ❌");
    doneAudio.play();
  }
};



  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
      <input name="fullName" placeholder="Full Name" value={data.fullName} onChange={handleChange} />
      <input name="storeName" placeholder="Store Name" value={data.storeName} onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" value={data.email} onChange={handleChange} />
      <input name="city" placeholder="City" value={data.city} onChange={handleChange} />
      <input name="linkdata" placeholder="Website / Link" value={data.linkdata} onChange={handleChange} />
      <input name="zipcode" placeholder="Zip Code" value={data.zipcode} onChange={handleChange} />
      <input name="address" placeholder="Address" value={data.address} onChange={handleChange} />
      <input name="street" placeholder="Street" value={data.street} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={data.phone} onChange={handleChange} />
      <input name="age" placeholder="Age" value={data.age} onChange={handleChange} />

      <select name="gender" value={data.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <button type="submit" onClick={() => navigate("/verify")}>Submit</button>
    </form>
  );
};

export default Input;

import React, { useState, useContext } from "react";
import axios from "axios";
import "./input.css";
import { DelContext } from "../DelContext/DelContext";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const navigate = useNavigate();
  const { url, doneAudio, wonAudio } = useContext(DelContext);

  const [data, setData] = useState({
    storeName: "",
    fullName: "",
    email: "",
    city: "",
    linkdata: "",
    zipcode: "",
    address: "",
    street: "",
    phone: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(url + "/api/input/create", data);

      // ❌ if not created
      if (!res.data.success) {
        alert("User not created ❌");
        return;
      }

      // ✅ success
      alert("User created successfully ✅");
      wonAudio.play();

      // ✅ mark delivery data created
      localStorage.setItem("deliveryCreated", "true");

      // ✅ navigate ONLY after success
      navigate("/verify", {
        state: {
          email: res.data.email,
          phone: res.data.phone,
          userId: res.data.userId,
        },
      });

      // ✅ clear form
      setData({
        storeName: "",
        fullName: "",
        email: "",
        city: "",
        linkdata: "",
        zipcode: "",
        address: "",
        street: "",
        phone: "",
        age: "",
        gender: "",
      });

    } catch (error) {
      console.error(error);
      alert("User not found ❌");
      doneAudio.play();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
      <input name="fullName" placeholder="Full Name" value={data.fullName} onChange={handleChange} />
      <input name="storeName" placeholder="Delvery id Name" value={data.storeName} onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" value={data.email} onChange={handleChange} />
      <input name="city" placeholder="City" value={data.city} onChange={handleChange} />
      <input name="linkdata" placeholder="Website / Link" value={data.linkdata} onChange={handleChange} />
      <input name="zipcode" placeholder="Zip Code" value={data.zipcode} onChange={handleChange} />
      <input name="address" placeholder="Address" value={data.address} onChange={handleChange} />
      <input name="street" placeholder="Street" value={data.street} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={data.phone} onChange={handleChange} />
      <input name="age" placeholder="Age" value={data.age} onChange={handleChange} />

      <select name="gender" value={data.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      
      <button type="submit">Submit</button>
    </form>
  );
};

export default Input;
*/

import React, { useState, useContext } from "react";
import axios from "axios";
import "./input.css";
import { DelContext } from "../DelContext/DelContext";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const navigate = useNavigate();
  const { url, doneAudio, wonAudio } = useContext(DelContext);

  const [data, setData] = useState({
    storeName: "",
    fullName: "",
    email: "",
    city: "",
    linkdata: "",
    pincode: "", // ✅ renamed from zipcode
    address: "",
    street: "",
    phone: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Call verifyUser API instead of create
      const res = await axios.post(`${url}/api/input/verify`, {
        email: data.email,
        phone: data.phone,
        storeName: data.storeName,
      });

      if (!res.data.success) {
        alert("User data not matched ❌");
        return;
      }

      // ✅ Match found
      alert("User verified successfully ✅");
      wonAudio.play();

      // ✅ Navigate to next page
      navigate("/verify", {
        state: {
          userId: res.data.userId,
          email: res.data.email,
          phone: res.data.phone,
        },
      });

      // ✅ Clear form
      setData({
        storeName: "",
        fullName: "",
        email: "",
        city: "",
        linkdata: "",
        pincode: "",
        address: "",
        street: "",
        phone: "",
        age: "",
        gender: "",
      });

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "User data not matched ❌"
      );
      doneAudio.play();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
      <input
        name="fullName"
        placeholder="Full Name"
        value={data.fullName}
        onChange={handleChange}
      />
      <input
        name="storeName"
        placeholder="Delivery ID Name"
        value={data.storeName}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
      />
      <input
        name="city"
        placeholder="City"
        value={data.city}
        onChange={handleChange}
      />
      <input
        name="linkdata"
        placeholder="Website / Link"
        value={data.linkdata}
        onChange={handleChange}
      />
      <input
        name="pincode"
        placeholder="Pincode"
        value={data.pincode}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Address"
        value={data.address}
        onChange={handleChange}
      />
      <input
        name="street"
        placeholder="Street"
        value={data.street}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone"
        value={data.phone}
        onChange={handleChange}
      />
      <input
        name="age"
        placeholder="Age"
        value={data.age}
        onChange={handleChange}
      />

      <select name="gender" value={data.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Input;
