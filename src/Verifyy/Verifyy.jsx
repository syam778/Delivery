/*import React, {  useContext, useState, } from "react";
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
        `${url}/api/delivery/verify`,
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
*/
import React, { useContext, useState } from "react";
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${url}/api/delivery/verify`,
        {
          gmail: formData.email,
          number: formData.phone,
          userSpecialId: formData.storeName,
        }
      );

      if (res.data.success) {
        setMessage("✅ Delivery Boy verified successfully");

        localStorage.setItem(
          "delBoyData",
          JSON.stringify(res.data.data)
        );

        setTimeout(() => {
          navigate("/delorder");
        }, 1000);
      } else {
        setMessage(`❌ ${res.data.message}`);
      }
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
        "❌ Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <h2>Verify Delivery Boy</h2>

      <form onSubmit={handleVerify} className="verify-form">
        <input
          type="email"
          name="email"
          placeholder="Gmail"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="storeName"
          placeholder="User Special ID"
          value={formData.storeName}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {message && (
        <p className="verify-message">
          {message}
        </p>
      )}
    </div>
  );
};

export default Verifyy;