
/*
import { useState, useEffect, useRef } from "react";  //main core
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DelOrder.css"; // Your existing CSS


const BASE_URL = "http://localhost:3000/api";

const DelOrder = () => {
  const [form, setForm] = useState({ gmail: "", userSpecialId: "" });
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [online, setOnline] = useState(false);
  const [onlineStartTime, setOnlineStartTime] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const [currentOrder, setCurrentOrder] = useState(null);
  const [newOrderPopup, setNewOrderPopup] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  const lastPopupOrderId = useRef(null);
  const orderAudio = useRef(new Audio("/Audios/order.mp3"));

  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // ⏱ Clock update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 🔐 LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${BASE_URL}/delboy/get-single`, form);

      if (res.data.success) {
        setUser(res.data.data);
        setMessage("✅ Delivery boy verified");
        localStorage.setItem("deliveryBoy", JSON.stringify(res.data.data));
        fetchOrderHistory(res.data.data.userSpecialId); // fetch history after login
      } else {
        setMessage("❌ Invalid credentials");
      }
    } catch (err) {
      console.error("LOGIN ERROR 👉", err);
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 ONLINE / OFFLINE
  const toggleOnline = async () => {
    if (!user) return;

    try {
      if (!online) {
        setOnline(true);
        setOnlineStartTime(Date.now());
        await axios.post(`${BASE_URL}/delboy/online`, { id: user._id });
      } else {
        setOnline(false);
        if (onlineStartTime) {
          const sec = Math.floor((Date.now() - onlineStartTime) / 1000);
          setTotalSeconds((prev) => prev + sec);
        }
        setOnlineStartTime(null);
        setCurrentOrder(null);
        setNewOrderPopup(null);
        lastPopupOrderId.current = null;
        await axios.post(`${BASE_URL}/delboy/offline`, { id: user._id });
      }
    } catch (err) {
      console.error("ONLINE/OFFLINE ERROR 👉", err);
    }
  };

  // 📦 FETCH CURRENT ORDERS (Polling)
  useEffect(() => {
    if (!user || !online) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/assignorder/my-orders/${user._id}`
        );

        if (!res.data.success) return;

        const orders = res.data.data || [];

        // Only active orders
        const activeOrders = orders.filter((o) =>
          ["assigned", "pickup", "out for delivery"].includes(
            o.status.toLowerCase()
          )
        );

        // New Order Popup
        const assigned = activeOrders.find(
          (o) => o.status.toLowerCase() === "assigned"
        );

        if (assigned && lastPopupOrderId.current !== assigned._id) {
          lastPopupOrderId.current = assigned._id;
          setNewOrderPopup(assigned);
          orderAudio.current.currentTime = 0;
          orderAudio.current.play();
        }

        // Current working order
        const working = activeOrders.find((o) =>
          ["pickup", "out for delivery"].includes(o.status.toLowerCase())
        );
        setCurrentOrder(working || null);
      } catch (err) {
        console.error("FETCH ORDER ERROR 👉", err);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [user, online]);

  // ✅ RECEIVE ORDER
  const receiveOrder = async (orderId) => {
    try {
      orderAudio.current.pause();
      const res = await axios.post(`${BASE_URL}/assignorder/update-status`, {
        orderId,
        status: "Pickup",
      });

      if (res.data.success) {
        alert("✅ Order Received");
        setNewOrderPopup(null);
        lastPopupOrderId.current = null;
      } else {
        alert("❌ Failed to receive order");
      }
    } catch (err) {
      console.error("RECEIVE ERROR 👉", err);
    }
  };

  // ❌ CANCEL ORDER
  const cancelOrder = async (orderId) => {
    try {
      orderAudio.current.pause();
      const res = await axios.post(`${BASE_URL}/assignorder/cancel`, {
        orderId,
      });

      if (res.data.success) {
        alert("❌ Order Cancelled");
        setNewOrderPopup(null);
        setCurrentOrder(null);
        lastPopupOrderId.current = null;
      } else {
        alert("❌ Failed to cancel order");
      }
    } catch (err) {
      console.error("CANCEL ERROR 👉", err);
    }
  };

  // ⏱ Format time
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentSessionSeconds = onlineStartTime
    ? Math.floor((Date.now() - onlineStartTime) / 1000)
    : 0;

  // 📝 FETCH ORDER HISTORY
  const fetchOrderHistory = async (userSpecialId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/assignorder/history/${userSpecialId}`
      );

      if (res.data.success) {
        setOrderHistory(res.data.data);
      } else {
        console.error("Failed to fetch order history");
      }
    } catch (err) {
      console.error("FETCH HISTORY ERROR 👉", err);
    }
  };

  return (
    <div className="del-container">
      
      {user && (
        <button
          className="history-btn"
          onClick={() => navigate(`/delivery/history/${user._id}`)}
        >
          📝 View Order History
        </button>
      )}

      <h2>🚴 Delivery Boy Dashboard</h2>

      
      {!user && (
        <form className="delivery-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.gmail}
            onChange={(e) => setForm({ ...form, gmail: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Special ID"
            value={form.userSpecialId}
            onChange={(e) =>
              setForm({ ...form, userSpecialId: e.target.value })
            }
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Find"}
          </button>
        </form>
      )}

      {message && <p className="msg">{message}</p>}

      
      {user && (
        <div className="status-card">
          <p>
            <b>Name:</b> {user.name} ({user.userSpecialId})
          </p>

          <p>
            <b>Status:</b>{" "}
            <span className={online ? "online" : "offline"}>
              {online ? "ONLINE" : "OFFLINE"}
            </span>
          </p>

          {online && (
            <p>
              <b>Online Time:</b> {formatTime(currentSessionSeconds)}
            </p>
          )}

          {!online && totalSeconds > 0 && (
            <p>
              <b>Last Session:</b> {formatTime(totalSeconds)}
            </p>
          )}

          <button onClick={toggleOnline}>
            {online ? "Go Offline" : "Go Online"}
          </button>

          <p>
            <b>Date:</b> {currentTime.toLocaleDateString()}
          </p>
          <p>
            <b>Time:</b> {currentTime.toLocaleTimeString()}
          </p>
        </div>
      )}

      
      {newOrderPopup && (
        <div className="order-popup-overlay">
          <div className="order-popup">
            <h3>🆕 New Order</h3>
            <p>
              <b>Name:</b>{" "}
              {newOrderPopup.address?.firstName}{" "}
              {newOrderPopup.address?.lastName}
            </p>
            <p>
              <b>Phone:</b> {newOrderPopup.address?.phone}
            </p>
            <p>
              <b>City:</b> {newOrderPopup.address?.city}
            </p>
            <ul>
              {newOrderPopup.items?.map((item, i) => (
                <li key={i}>
                  <b>{item.name}</b> × {item.quantity} <br />
                  Price: ₹{item.price} <br />
                  Category: {item.category}
                </li>
              ))}
            </ul>
            <p>
              <b>Total Amount:</b> ₹{newOrderPopup.amount}
            </p>
            <div className="popup-actions">
              <button onClick={() => receiveOrder(newOrderPopup._id)}>
                Receive
              </button>
              <button
                className="remove"
                onClick={() => cancelOrder(newOrderPopup._id)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      
      {user && online && currentOrder && (
        <div className="order-card">
          <h3>📦 Current Order</h3>

          {currentOrder.items?.map((item, i) => (
            <div key={i} className="popupm">
              <p>
                <b>Item:</b> {item.name} × {item.quantity}
              </p>
              <p>
                <b>Store Address:</b> {item.street}
              </p>
              <p>
                <b>Price:</b> ₹{item.price}
              </p>
              <p>
                <b>Category:</b> {item.category}
              </p>
              {item.linkdata && (
                <a
                  href={item.linkdata}
                  target="_blank"
                  rel="noreferrer"
                  className="mapbtn"
                >
                  🗺️ Navigate to Store
                </a>
              )}
              <hr />
            </div>
          ))}

          <p>
            <b>Total Amount:</b> ₹{currentOrder.amount}
          </p>
          <p>
            <b>Status:</b> {currentOrder.status}
          </p>

          <button
            className="pickup"
            onClick={async () => {
              try {
                const res = await axios.post(
                  `${BASE_URL}/assignorder/update-status`,
                  {
                    orderId: currentOrder._id,
                    status: "Out For Delivery",
                  }
                );

                if (res.data.success) {
                  localStorage.setItem(
                    "currentOrder",
                    JSON.stringify(currentOrder)
                  );
                  navigate(`/out-for-delivery/${currentOrder._id}`);
                } else {
                  alert("❌ Failed to update status");
                }
              } catch (err) {
                console.error("PICKUP ERROR 👉", err);
                alert("❌ Failed to pick up order");
              }
            }}
          >
            🚚 Pick Up Order
          </button>
        </div>
      )}

      
      {user && orderHistory.length > 0 && (
        <div className="order-history-card">
          <h3>📝 Total Order History</h3>
          {orderHistory.map((order) => (
            <div key={order._id} className="history-item">
              <p><b>Order ID:</b> {order._id}</p>
              <p><b>Status:</b> {order.status}</p>
              <p><b>Total Amount:</b> ₹{order.amount}</p>
              <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} - ₹{item.price}
                    {item.linkdata && (
                      <a
                        href={item.linkdata}
                        target="_blank"
                        rel="noreferrer"
                        className="mapbtn"
                      >
                        🗺️ Map
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DelOrder;
 
*/

import { useState, useEffect, useRef } from "react"; // main core
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DelOrder.css"; // Your existing CSS
import { useContext } from "react";
import { DelContext } from "../../DelContext/DelContext";


//const BASE_URL = "http://localhost:3000/api";

const DelOrder = () => {
  const [form, setForm] = useState({ gmail: "", userSpecialId: "" });

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [online, setOnline] = useState(false);
  const [onlineStartTime, setOnlineStartTime] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const [currentOrder, setCurrentOrder] = useState(null);
  const [newOrderPopup, setNewOrderPopup] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  const lastPopupOrderId = useRef(null);
  const orderAudio = useRef(new Audio("/Audios/order.mp3"));
  const { wonAudio, doneAudio, submitAudio, addAudio, timeAudio, url} = useContext(DelContext);

  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // ⏱ Clock update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ⏱ Timer tick for live order timers
  const [timerTick, setTimerTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTimerTick((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔐 LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${url}/api/delboy/get-single`, form);
      if (res.data.success) {
        setUser(res.data.data);
        setMessage("✅ Delivery boy verified");
        wonAudio.play()
        localStorage.setItem("deliveryBoy", JSON.stringify(res.data.data));
        fetchOrderHistory(res.data.data.userSpecialId);
      } else {
        setMessage("❌ Invalid credentials");
      }
    } catch (err) {
      console.error("LOGIN ERROR 👉", err);
      setMessage("❌ Server error");
      doneAudio.play()
    } finally {
      setLoading(false);
    }
  };

  // 🟢 ONLINE / OFFLINE
  const toggleOnline = async () => {
    if (!user) return;
    try {
      if (!online) {
        setOnline(true);
        setOnlineStartTime(Date.now());
        submitAudio.play()
        await axios.post(`${url}/api/delboy/online`, { id: user._id });
      } else {
        setOnline(false);
        if (onlineStartTime) {
          const sec = Math.floor((Date.now() - onlineStartTime) / 1000);
          setTotalSeconds((prev) => prev + sec);
        }
        setOnlineStartTime(null);
        setCurrentOrder(null);
        setNewOrderPopup(null);
        lastPopupOrderId.current = null;
        await axios.post(`${url}/api/delboy/offline`, { id: user._id });
      }
    } catch (err) {
      console.error("ONLINE/OFFLINE ERROR 👉", err);
      doneAudio.play()
    }
  };

  // 📦 FETCH CURRENT ORDERS (Polling)
  useEffect(() => {
    if (!user || !online) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${url}/api/assignorder/my-orders/${user._id}`
        );
        if (!res.data.success) return;

        const orders = res.data.data || [];

        const activeOrders = orders.filter((o) =>
          ["assigned", "pickup", "out for delivery"].includes(
            o.status.toLowerCase()
          )
        );

        // New Order Popup
        const assigned = activeOrders.find(
          (o) => o.status.toLowerCase() === "assigned"
        );
        if (assigned && lastPopupOrderId.current !== assigned._id) {
          lastPopupOrderId.current = assigned._id;
          setNewOrderPopup(assigned);
          orderAudio.current.currentTime = 0;
          orderAudio.current.play();
        }

        // Current working order
        const working = activeOrders.find((o) =>
          ["pickup", "out for delivery"].includes(o.status.toLowerCase())
        );
        setCurrentOrder(working || null);
      } catch (err) {
        console.error("FETCH ORDER ERROR 👉", err);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [user, online]);

  // ✅ RECEIVE ORDER
  const receiveOrder = async (orderId) => {
    try {
      orderAudio.current.pause();
      const res = await axios.post(`${url}/api/assignorder/update-status`, {
        orderId,
        status: "pickup",
      });
      if (res.data.success) {
        alert("✅ Order Received");
        setNewOrderPopup(null);
        timeAudio.play()
        lastPopupOrderId.current = null;
      } else {
        alert("❌ Failed to receive order");
      }
    } catch (err) {
      console.error("RECEIVE ERROR 👉", err);
    }
  };

  // ❌ CANCEL ORDER
  const cancelOrder = async (orderId) => {
    try {
      orderAudio.current.pause();
      const res = await axios.post(`${url}/api/assignorder/cancel`, {
        orderId,
      });
      if (res.data.success) {
        alert("❌ Order Cancelled");
        setNewOrderPopup(null);
        setCurrentOrder(null);
        doneAudio.play();
        lastPopupOrderId.current = null;
      } else {
        alert("❌ Failed to cancel order");
      }
    } catch (err) {
      console.error("CANCEL ERROR 👉", err);
    }
  };

  // ⏱ Format duration
  const formatDuration = (start, end = new Date()) => {
    if (!start) return "-";
    const ms = new Date(end) - new Date(start);
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  };

  const currentSessionSeconds = onlineStartTime
    ? Math.floor((Date.now() - onlineStartTime) / 1000)
    : 0;

  // 📝 FETCH ORDER HISTORY
  const fetchOrderHistory = async (userSpecialId) => {
    try {
      const res = await axios.get(
        `${url}/api/assignorder/history/${userSpecialId}`
      );
      if (res.data.success) setOrderHistory(res.data.data);
    } catch (err) {
      console.error("FETCH HISTORY ERROR 👉", err);
    }
  };

  return (
    <div className="del-container">
      {user && (
        <button
          className="history-btn"
          onClick={() => navigate(`/delivery/history/${user._id}`)}
        >
          📝 View Order History
        </button>
      )}

      <h2>🚴 Delivery Boy Dashboard</h2>

      {!user && (
        <form className="delivery-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.gmail}
            onChange={(e) => setForm({ ...form, gmail: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Special ID"
            value={form.userSpecialId}
            onChange={(e) =>
              setForm({ ...form, userSpecialId: e.target.value })
            }
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Find"}
          </button>
        </form>
      )}

      {message && <p className="msg">{message}</p>}

      {user && (
        <div className="status-card">
          <p>
            <b>Name:</b> {user.name} ({user.userSpecialId})
          </p>
          <p>
            <b>Status:</b>{" "}
            <span className={online ? "online" : "offline"}>
              {online ? "ONLINE" : "OFFLINE"}
            </span>
          </p>

          {online && (
            <p>
              <b>Online Time:</b> {formatDuration(new Date(Date.now() - currentSessionSeconds * 1000))}
            </p>
          )}
          {!online && totalSeconds > 0 && (
            <p>
              <b>Last Session:</b> {formatDuration(totalSeconds * 1000)}
            </p>
          )}

          <button onClick={toggleOnline}>
            {online ? "Go Offline" : "Go Online"}
          </button>

          <p>
            <b>Date:</b> {currentTime.toLocaleDateString()}
          </p>
          <p>
            <b>Time:</b> {currentTime.toLocaleTimeString()}
          </p>
        </div>
      )}

      {newOrderPopup && (
        <div className="order-popup-overlay">
          <div className="order-popup">
            <h3>🆕 New Order</h3>
            <p>
              <b>Name:</b>{" "}
              {newOrderPopup.address?.firstName}{" "}
              {newOrderPopup.address?.lastName}
            </p>
            <p>
              <b>Phone:</b> {newOrderPopup.address?.phone}
            </p>
            <p>
              <b>City:</b> {newOrderPopup.address?.city}
            </p>
            <p>
              <b>⏱ Time Since Assigned:</b>{" "}
              {formatDuration(newOrderPopup.assignedAt)}
            </p>
            <ul>
              {newOrderPopup.items?.map((item, i) => (
                <li key={i}>
                  <b>{item.name}</b> × {item.quantity} <br />
                  Price: ₹{item.price} <br />
                  Category: {item.category}
                </li>
              ))}
            </ul>
            <p>
              <b>Total Amount:</b> ₹{newOrderPopup.amount}
            </p>
            <div className="popup-actions">
              <button onClick={() => receiveOrder(newOrderPopup._id)}>
                Receive
              </button>
              <button
                className="remove"
                onClick={() => cancelOrder(newOrderPopup._id)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {user && online && currentOrder && (
        <div className="order-card">
          <h3>📦 Current Order</h3>

          {currentOrder.items?.map((item, i) => (
            <div key={i} className="popupm">

              {item?.phone && (
                <a href={`tel:${item.phone}`} className="call-btn">
                  📞 Call Customer
                </a>
              )}

              
              <p>
                <b>Item:</b> {item.name} × {item.quantity}
              </p>
              <p>
                <b>Store Address:</b> {item.street}
              </p>
              <p>
                <b>Price:</b> ₹{item.price}
              </p>
              <p>
                <b>Category:</b> {item.category}
              </p>
              {item.linkdata && (
                <a
                  href={item.linkdata}
                  target="_blank"
                  rel="noreferrer"
                  className="mapbtn"
                >
                  🗺️ Navigate to Store
                </a>
              )}
              <hr />
            </div>
          ))}

          <p>
            <b>Total Amount:</b> ₹{currentOrder.amount}
          </p>
          <p>
            <b>Status:</b> {currentOrder.status}
          </p>
          <p>
            <b>⏱ Order Timer:</b>{" "}
            {currentOrder.status === "assigned"
              ? formatDuration(currentOrder.assignedAt)
              : currentOrder.status === "pickup"
                ? formatDuration(currentOrder.pickupAt)
                : currentOrder.status === "out for delivery"
                  ? formatDuration(currentOrder.pickupAt)
                  : currentOrder.status === "delivered"
                    ? formatDuration(currentOrder.assignedAt, currentOrder.deliveredAt)
                    : "-"}
          </p>

          <button
            className="pickup"
            onClick={async () => {
              try {
                const res = await axios.post(
                  `${url}/api/assignorder/update-status`,
                  {
                    orderId: currentOrder._id,
                    status: "out for delivery",
                  }
                );

                if (res.data.success) {
                  localStorage.setItem(
                    "currentOrder",
                    JSON.stringify(currentOrder)

                  );
                  wonAudio.play();
                  navigate(`/out-for-delivery/${currentOrder._id}`);
                } else {
                  alert("❌ Failed to update status");
                }
              } catch (err) {
                console.error("PICKUP ERROR 👉", err);
                alert("❌ Failed to pick up order");
              }
            }}
          >
            🚚 Pick Up Order
          </button>
        </div>
      )}


      {user && orderHistory.length > 0 && (
        <div className="order-history-card">
          <h3>📝 Total Order History</h3>
          {orderHistory.map((order) => (
            <div key={order._id} className="history-item">

              <p><b>Order ID:</b> {order._id}</p>
              <p><b>Status:</b> {order.status}</p>
              <p><b>Total Amount:</b> ₹{order.amount}</p>
              <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
              <p>
                <b>Total Time:</b>{" "}
                {order.status === "delivered"
                  ? formatDuration(order.assignedAt, order.deliveredAt)
                  : "-"}
              </p>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} - ₹{item.price}
                    {item.linkdata && (
                      <a
                        href={item.linkdata}
                        target="_blank"
                        rel="noreferrer"
                        className="mapbtn"
                      >
                        🗺️ Map
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DelOrder;
