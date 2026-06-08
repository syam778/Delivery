/*import React, { useState, useContext } from "react";
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

export default Input; //old code
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
    pincode: "",
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
      const res = await axios.post(
        `${url}/api/delboy/create-from-deliver`,
        {
          gmail: data.email,
          number: data.phone,
          userSpecialId: data.storeName,
        }
      );

      if (!res.data.success) {
        alert(res.data.message);
        doneAudio.play();
        return;
      }

      wonAudio.play();

      // save complete data
      localStorage.setItem(
        "delBoyData",
        JSON.stringify(res.data.data)
      );

      alert("✅ Delivery Boy Verified");

      navigate("/verify", {
        state: {
          delBoy: res.data.data,
          delBoyId: res.data.delBoyId,
        },
      });

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Delivery Boy verification failed"
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
        placeholder="User Special ID"
        value={data.storeName}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Gmail"
        value={data.email}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={data.phone}
        onChange={handleChange}
        required
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
        name="age"
        placeholder="Age"
        value={data.age}
        onChange={handleChange}
      />

      <select
        name="gender"
        value={data.gender}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <button type="submit">
        Verify Delivery Boy
      </button>
    </form>
  );
};

export default Input;