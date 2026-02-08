import { useContext, useState } from "react";
import axios from "axios";
import "./UserOrderPage.css";
import { useNavigate } from "react-router-dom";
import { DelContext } from "../../DelContext/DelContext";


const BASE_URL = "http://localhost:3000/api/input";



const UserOrderPage = () => {
  const [form, setForm] = useState({ email: "", phone: "" });
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {wonAudio,doneAudio,submitAudio,addAudio,timeAudio,} = useContext(DelContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setProfile(null);

    if (!form.email || !form.phone) {
      setMessage("Email and phone are required");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/createdelprofileuser`, form);
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
*/
const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setProfile(null);

  if (!form.email || !form.phone) {
    setMessage("Email and phone are required");
    return;
  }

  try {
    const res = await axios.post(
      `${BASE_URL}/createdelprofileuser`,
      form
    );

    if (res.data.success) {
      setProfile(res.data.data);
      setMessage(res.data.message);
      wonAudio.play()

      // ✅ MATCH → GO NEXT PAGE
      navigate("/delorder", {
        state: {
          email: form.email,
          phone: form.phone,
          user: res.data.data,
        },
      });

    } else {
      // ❌ NOT MATCH → STAY HERE
      setMessage(res.data.message || "User not found ❌");
    }

  } catch (err) {
    console.error(err);
    setMessage("Server error ❌");
    doneAudio.play()
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
        <button type="submit"  >Order Page</button>
      </form>

      {message && <p className="msg">{message}</p>}
      <h2> Go Order Page</h2>
    </div>
  );
};

export default UserOrderPage ;
