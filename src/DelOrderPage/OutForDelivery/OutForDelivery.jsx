/*import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const OutForDelivery = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // 1️⃣ Try loading order from localStorage
    const savedOrder = localStorage.getItem("currentOrder");
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);
      if (parsedOrder._id === orderId) {
        setOrder(parsedOrder);
      }
    }

    // 2️⃣ Optionally, fetch fresh data from backend
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/assignorder/order/${orderId}`);
        if (res.data.success) setOrder(res.data.data);
      } catch (err) {
        console.error("FETCH ORDER ERROR 👉", err);
      }
    };

    if (!order) fetchOrder();
  }, [orderId]);

  if (!order) return <p>Loading order...</p>;

  return (
    <div>
      <h2>📦 Out For Delivery</h2>
      <p><b>Order ID:</b> {order._id}</p>
      <p><b>Customer:</b> {order.address?.firstName} {order.address?.lastName}</p>
      <p><b>Phone:</b> {order.address?.phone}</p>
      <p><b>Status:</b> {order.status}</p>

      <h3>Items:</h3>
      <ul>
        {order.items?.map((item, i) => (
          <li key={i}>
            {item.name} × {item.quantity} - ₹{item.price}
          </li>
        ))}
      </ul>

      <p><b>Total Amount:</b> ₹{order.amount}</p>
    </div>
  );
};

export default OutForDelivery;
*
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./OutForDelivery.css";
import { input } from "../../assets/output";

const BASE_URL = "http://localhost:3000/api";

const OutForDelivery = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedOrder = localStorage.getItem("currentOrder");
    if (savedOrder) {
      const parsed = JSON.parse(savedOrder);
      if (parsed._id === orderId) setOrder(parsed);
    }

    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/assignorder/order/${orderId}`
        );
        if (res.data.success) setOrder(res.data.data);
      } catch (err) {
        console.error("FETCH ORDER ERROR 👉", err);
      }
    };

    if (!order) fetchOrder();
  }, [orderId]);

  // ✅ DELIVERED BUTTON HANDLER
  const markAsDelivered = async () => {
    if (!order) return;

    try {
      setLoading(true);

      await axios.post(`${BASE_URL}/assignorder/update-status`, {
        orderId: order._id,
        status: "Delivered",
      });

      // cleanup
      localStorage.removeItem("currentOrder");

      alert("✅ Order Delivered Successfully");

      // go back to dashboard
      navigate("/delorder");
    } catch (err) {
      console.error("DELIVER ERROR 👉", err);
      alert("❌ Failed to mark order as delivered");
    } finally {
      setLoading(false);
    }
  };

  if (!order) return <p className="loading">Loading order...</p>;

  return (
    <div className="out-container">
      <h2 className="title">🚴 Out For Delivery</h2>

      <div className="card order-info">
        <h3>Order Info</h3>
        <p><b>Order ID:</b> <span className="highlight">{order._id}</span></p>
        <p><b>Status:</b> <span className="status">{order.status}</span></p>
      </div>

      <div className="card customer-info">
        <h3>Customer Details</h3>
        <p><b>Name:</b> {order.address?.firstName} {order.address?.lastName}</p>
        <p><b>Phone:</b> {order.address?.phone}</p>
        <p><b>City:</b> {order.address?.city}</p>
        <p><b>Address:</b> {order.address?.street}</p>
      </div>

      <div className="card items-info">
        <h3>Items</h3>
        <ul>
          {order.items?.map((item, i) => (
            <li key={i}>
              <span className="item-name">{item.name}</span> × {item.quantity}
              <span className="item-price">₹{item.price}</span>
            </li>
          ))}
        </ul>
        <p className="total-amount">Total: ₹{order.amount}</p>
      </div>

      
      <button
        className="delivered-btn"
        onClick={markAsDelivered}
        disabled={loading}
      >
        {loading ? "Marking Delivered..." : "✅ Delivered"}
      </button>
    </div>

  );
};

export default OutForDelivery;
  
*



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./OutForDelivery.css";
import { input } from "../../assets/output";

const BASE_URL = "http://localhost:3000/api";

const OutForDelivery = () => {
  const { orderId } = useParams(); // route must be :orderId
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Load from localStorage first, then backend
  useEffect(() => {
    console.log("ORDER ID FROM URL 👉", orderId);

    const savedOrder = localStorage.getItem("currentOrder");
    if (savedOrder) {
      const parsed = JSON.parse(savedOrder);
      if (parsed._id === orderId) {
        setOrder(parsed);
      }
    }

    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/assignorder/order/${orderId}`
        );

        console.log("FETCH ORDER RESPONSE 👉", res.data);

        if (res.data.success) {
          setOrder(res.data.data);
        } else {
          alert("❌ Order not found");
        }
      } catch (err) {
        console.error("FETCH ORDER ERROR 👉", err.response?.data || err.message);
        alert("❌ Failed to load order from server");
      }
    };

    if (!order) fetchOrder();
  }, [orderId]);

  // 🔹 Mark as Delivered
  const markAsDelivered = async () => {
    if (!order) return;

    try {
      setLoading(true);

      await axios.post(`${BASE_URL}/assignorder/update-status`, {
        orderId: order._id,
        status: "Delivered",
      });

      // update local UI
      const updated = { ...order, status: "Delivered" };
      setOrder(updated);

      // cleanup
      localStorage.removeItem("currentOrder");

      alert("✅ Order Delivered Successfully");

      // go back to dashboard
      navigate("/delorder");
    } catch (err) {
      console.error("DELIVER ERROR 👉", err.response?.data || err.message);
      alert("❌ Failed to mark order as delivered");
    } finally {
      setLoading(false);
    }
  };

  if (!order) return <p className="loading">Loading order...</p>;

  const currentStatus = order.status?.toLowerCase();

  return (
    <div className="out-container">
      <h2 className="title">🚴 Out For Delivery</h2>

      <div className="card order-info">
        <h3>Order Info</h3>
        <p>
          <b>Order ID:</b>{" "}
          <span className="highlight">{order._id}</span>
        </p>
        <p>
          <b>Status:</b>{" "}
          <span className="status">{order.status}</span>
        </p>
      </div>

      <div className="card status-tracker">
        <h3>Order Progress</h3>
        <div className="steps">
          {["Assigned", "Pickup", "Out For Delivery", "Delivered"].map(
            (step, i) => {
              const isActive =
                (step === "Assigned" &&
                  ["assigned", "pickup", "out for delivery", "delivered"].includes(
                    currentStatus
                  )) ||
                (step === "Pickup" &&
                  ["pickup", "out for delivery", "delivered"].includes(
                    currentStatus
                  )) ||
                (step === "Out For Delivery" &&
                  ["out for delivery", "delivered"].includes(
                    currentStatus
                  )) ||
                (step === "Delivered" &&
                  ["delivered"].includes(currentStatus));

              return (
                <div key={i} className={`step ${isActive ? "active" : ""}`}>
                  <div className="circle">{isActive ? "✓" : i + 1}</div>
                  <span>{step}</span>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="card customer-info">
        <h3>Customer Details</h3>
        <p>
          <b>Name:</b> {order.address?.firstName}{" "}
          {order.address?.lastName}
        </p>
        <p>
          <b>Phone:</b> {order.address?.phone}
        </p>
        <p>
          <b>City:</b> {order.address?.city}
        </p>
        <p>
          <b>Address:</b> {order.address?.street}
        </p>
      </div>

      <div className="card items-info">
        <h3>Items</h3>

        {order.items?.map((item, i) => (
          <div key={i} className="item-card">
            <div className="item-left">
              <p className="item-name">{item.name}</p>
              <p className="item-category">{item.category}</p>
              {item.description && (
                <p className="item-desc">{item.description}</p>
              )}
            </div>

            <div className="item-right">
              <p className="qty">× {item.quantity}</p>
              <p className="price">₹{item.price}</p>
            </div>
          </div>
        ))}

        <div className="bill">
          <p>
            <b>Total Amount:</b> ₹{order.amount}
          </p>
        </div>
      </div>

      {order.address?.linkdata && (
        <a
          href={order.address.linkdata}
          target="_blank"
          rel="noreferrer"
          className="map-btn"
        >
          🗺️ Navigate to Customer
        </a>
      )}

      
      <button
        className="delivered-btn"
        onClick={markAsDelivered}
        disabled={loading || currentStatus === "delivered"}
      >
        {loading
          ? "Marking Delivered..."
          : currentStatus === "delivered"
          ? "✅ Already Delivered"
          : "✅ Mark as Delivered"}
      </button>
    </div>
  );
};

export default OutForDelivery;

*



import { useEffect, useState, useRef } from "react";  //core code main
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./OutForDelivery.css";

const BASE_URL = "http://localhost:3000/api";

const OutForDelivery = () => {
  const { orderId } = useParams(); // route must be :orderId
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState("00:00:00"); // Live timer display

  const timerRef = useRef(null);

  // Format milliseconds to hh:mm:ss
  const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 🔹 Load order from localStorage or backend
  useEffect(() => {
    const savedOrder = localStorage.getItem("currentOrder");
    if (savedOrder) {
      const parsed = JSON.parse(savedOrder);
      if (parsed._id === orderId) setOrder(parsed);
    }

    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/assignorder/order/${orderId}`);
        if (res.data.success) setOrder(res.data.data);
        else alert("❌ Order not found");
      } catch (err) {
        console.error("FETCH ORDER ERROR 👉", err.response?.data || err.message);
        alert("❌ Failed to load order from server");
      }
    };

    if (!order) fetchOrder();
  }, [orderId]);

  // 🔹 Start live timer
  useEffect(() => {
    if (!order) return;

    // Clear any existing interval
    if (timerRef.current) clearInterval(timerRef.current);

    const startTime = new Date(order.assignedAt).getTime();

    timerRef.current = setInterval(() => {
      const now = new Date().getTime();
      const endTime = order.status.toLowerCase() === "delivered"
        ? new Date(order.deliveredAt || now).getTime()
        : now;

      const elapsed = endTime - startTime;
      setTimer(formatDuration(elapsed));

      // Stop timer if delivered
      if (order.status.toLowerCase() === "delivered") {
        clearInterval(timerRef.current);
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [order]);

  // 🔹 Mark as Delivered
  const markAsDelivered = async () => {
    if (!order) return;

    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/assignorder/update-status`, {
        orderId: order._id,
        status: "Delivered",
      });

      if (res.data.success) {
        const updated = { ...order, status: "Delivered", deliveredAt: new Date() };
        setOrder(updated);
        localStorage.removeItem("currentOrder");
        alert("✅ Order Delivered Successfully");
        navigate("/delorder");
      } else {
        alert("❌ Failed to mark order as delivered");
      }
    } catch (err) {
      console.error("DELIVER ERROR 👉", err.response?.data || err.message);
      alert("❌ Failed to mark order as delivered");
    } finally {
      setLoading(false);
    }
  };

  if (!order) return <p className="loading">Loading order...</p>;

  const currentStatus = order.status?.toLowerCase();

  return (
    <div className="out-container">
      <h2 className="title">🚴 Out For Delivery</h2>

      <div className="card order-info">
        <h3>Order Info</h3>
        <p><b>Order ID:</b> <span className="highlight">{order._id}</span></p>
        <p><b>Status:</b> <span className="status">{order.status}</span></p>
        <p><b>⏱ Total Time:</b> {timer}</p>
      </div>

      <div className="card status-tracker">
        <h3>Order Progress</h3>
        <div className="steps">
          {["Assigned", "Pickup", "Out For Delivery", "Delivered"].map(
            (step, i) => {
              const isActive =
                (step === "Assigned" &&
                  ["assigned", "pickup", "out for delivery", "delivered"].includes(currentStatus)) ||
                (step === "Pickup" &&
                  ["pickup", "out for delivery", "delivered"].includes(currentStatus)) ||
                (step === "Out For Delivery" &&
                  ["out for delivery", "delivered"].includes(currentStatus)) ||
                (step === "Delivered" &&
                  ["delivered"].includes(currentStatus));

              return (
                <div key={i} className={`step ${isActive ? "active" : ""}`}>
                  <div className="circle">{isActive ? "✓" : i + 1}</div>
                  <span>{step}</span>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="card customer-info">
        <h3>Customer Details</h3>
        <p><b>Name:</b> {order.address?.firstName} {order.address?.lastName}</p>
        <p><b>Phone:</b> {order.address?.phone}</p>
        <p><b>City:</b> {order.address?.city}</p>
        <p><b>Address:</b> {order.address?.street}</p>
      </div>

      <div className="card items-info">
        <h3>Items</h3>
        {order.items?.map((item, i) => (
          <div key={i} className="item-card">
            <div className="item-left">
              <p className="item-name">{item.name}</p>
              <p className="item-category">{item.category}</p>
              {item.description && <p className="item-desc">{item.description}</p>}
            </div>
            <div className="item-right">
              <p className="qty">× {item.quantity}</p>
              <p className="price">₹{item.price}</p>
            </div>
          </div>
        ))}
        <div className="bill">
          <p><b>Total Amount:</b> ₹{order.amount}</p>
        </div>
      </div>

      {order.address?.linkdata && (
        <a href={order.address.linkdata} target="_blank" rel="noreferrer" className="map-btn">
          🗺️ Navigate to Customer
        </a>
      )}

      <button
        className="delivered-btn"
        onClick={markAsDelivered}
        disabled={loading || currentStatus === "delivered"}
      >
        {loading
          ? "Marking Delivered..."
          : currentStatus === "delivered"
          ? "✅ Already Delivered"
          : "✅ Mark as Delivered"}
      </button>
    </div>
  );
};

export default OutForDelivery;

*/


import { useEffect, useState, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"; //main code core
import axios from "axios";
import "./OutForDelivery.css";
import { DelContext } from "../../DelContext/DelContext";

const BASE_URL = "http://localhost:3000/api";

const OutForDelivery = () => {
  const { orderId } = useParams(); // Route must be :orderId
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState("00:00:00"); // Live timer display
  const { wonAudio, doneAudio, submitAudio, addAudio, timeAudio, } = useContext(DelContext)

  const timerRef = useRef(null);

  // Format milliseconds to hh:mm:ss
  const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 🔹 Load order from localStorage or backend
  useEffect(() => {
    const savedOrder = localStorage.getItem("currentOrder");
    if (savedOrder) {
      const parsed = JSON.parse(savedOrder);
      if (parsed._id === orderId) setOrder(parsed);
    }

    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/assignorder/order/${orderId}`);
        if (res.data.success) setOrder(res.data.data);
        else alert("❌ Order not found");
      } catch (err) {
        console.error("FETCH ORDER ERROR 👉", err.response?.data || err.message);
        alert("❌ Failed to load order from server");
      }
    };

    if (!order) fetchOrder();
  }, [orderId]);

  // 🔹 Start live timer
  useEffect(() => {
    if (!order) return;

    // Clear existing interval
    if (timerRef.current) clearInterval(timerRef.current);

    const startTime = new Date(order.assignedAt).getTime();

    timerRef.current = setInterval(() => {
      let endTime;

      // If delivered, stop timer at deliveredAt
      if (order.status.toLowerCase() === "delivered") {
        endTime = new Date(order.deliveredAt || new Date()).getTime();
        clearInterval(timerRef.current); // ✅ Stop timer immediately
      } else {
        endTime = new Date().getTime();
      }

      const elapsed = endTime - startTime;
      setTimer(formatDuration(elapsed));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [order]);

  // 🔹 Mark as Delivered
  const markAsDelivered = async () => {
    if (!order) return;

    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/assignorder/update-status`, {
        orderId: order._id,
        status: "Delivered",
      });

      if (res.data.success) {
        const deliveredAt = new Date();
        const updated = { ...order, status: "Delivered", deliveredAt };
        setOrder(updated);
        timeAudio.play()

        // ✅ Update timer to final delivered duration
        const startTime = new Date(order.assignedAt).getTime();
        setTimer(formatDuration(deliveredAt - startTime));

        clearInterval(timerRef.current); // ✅ ensure interval stops
        localStorage.removeItem("currentOrder");
        alert("✅ Order Delivered Successfully");
        navigate("/delorder");
      } else {
        alert("❌ Failed to mark order as delivered");
      }
    } catch (err) {
      console.error("DELIVER ERROR 👉", err.response?.data || err.message);
      alert("❌ Failed to mark order as delivered");
    } finally {
      setLoading(false);
    }
  };



  if (!order) return <p className="loading">Loading order...</p>;

  const currentStatus = order.status?.toLowerCase();

  return (
    <div className="out-container">
      <h2 className="title">🚴 Out For Delivery</h2>

      <div className="card order-info">
        <h3>Order Info</h3>
        <p>
          <b>Order ID:</b> <span className="highlight">{order._id}</span>
        </p>
        <p>
          <b>Status:</b> <span className="status">{order.status}</span>
        </p>
        <p>
          <b>⏱ Total Time:</b> {timer}
        </p>
      </div>

      <div className="card status-tracker">
        <h3>Order Progress</h3>
        <div className="steps">
          {["Assigned", "Pickup", "Out For Delivery", "Delivered"].map(
            (step, i) => {
              const isActive =
                (step === "Assigned" &&
                  ["assigned", "pickup", "out for delivery", "delivered"].includes(
                    currentStatus
                  )) ||
                (step === "Pickup" &&
                  ["pickup", "out for delivery", "delivered"].includes(currentStatus)) ||
                (step === "Out For Delivery" &&
                  ["out for delivery", "delivered"].includes(currentStatus)) ||
                (step === "Delivered" &&
                  ["delivered"].includes(currentStatus));

              return (
                <div key={i} className={`step ${isActive ? "active" : ""}`}>
                  <div className="circle">{isActive ? "✓" : i + 1}</div>
                  <span>{step}</span>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="card customer-info">
        <h3>Customer Details</h3>
        <p>
          <b>Name:</b> {order.address?.firstName} {order.address?.lastName}
        </p>
        {order?.address?.phone && (
          <a href={`tel:${order.address.phone}`} className="call-btn">
            📞 Call Customer
          </a>
        )}


        <p>
          <b>City:</b> {order.address?.city}
        </p>
        <p>
          <b>Address:</b> {order.address?.street}
        </p>
      </div>

      <div className="card items-info">
        <h3>Items</h3>
        {order.items?.map((item, i) => (
          <div key={i} className="item-card">
            <div className="item-left">
              <p className="item-name">{item.name}</p>
              <p className="item-category">{item.category}</p>
              {item.description && <p className="item-desc">{item.description}</p>}
            </div>
            <div className="item-right">
              <p className="qty">× {item.quantity}</p>
              <p className="price">₹{item.price}</p>
            </div>
          </div>
        ))}
        <div className="bill">
          <p>
            <b>Total Amount:</b> ₹{order.amount}
          </p>
        </div>
      </div>

      {order.address?.linkdata && (
        <a
          href={order.address.linkdata}
          target="_blank"
          rel="noreferrer"
          className="map-btnk"
        >
          🗺️ Navigate to Customer
        </a>
      )}
      <button
        className="delivered-btn"
        onClick={markAsDelivered}
        disabled={loading || currentStatus === "delivered"}
      >
        {loading
          ? "Marking Delivered..."
          : currentStatus === "delivered"
            ? "✅ Already Delivered"
            : "✅ Mark as Delivered"}
      </button>

    </div>
  );
};

export default OutForDelivery;


