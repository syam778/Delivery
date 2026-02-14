/*import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; //try
import axios from "axios";
import "./DelOrderHistory.css";
import { DelContext } from "../../DelContext/DelContext";


//const BASE_URL = "https://back-q3wv.onrender.com/api"; // Update with your backend URL

const DelOrderHistory = () => {
  const {url} = useContext(DelContext);

  const { delBoyId } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 🔹 Update current time every second for live timers
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 🔹 Fetch delivery boy order history
  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${url}/api/assignorder/history/${delBoyId}`);
      if (res.data.success) {
        // Map timestamps to Date objects
        const mappedOrders = res.data.data.map((order) => {
          const assignedTime = order.assignedAt ? new Date(order.assignedAt) : null;
          const pickupTime = order.pickupAt ? new Date(order.pickupAt) : null;
          const deliveredTime = order.order?.deliveredAt ? new Date(order.order.deliveredAt) : null;

          return {
            ...order,
            assignedTime,
            pickupTime,
            deliveredTime,
          };
        });
        setOrders(mappedOrders);
      }
    } catch (error) {
      console.error("HISTORY ERROR 👉", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [delBoyId]);

  // ❌ Remove single assigned order
  const removeHistory = async (assignedOrderId) => {
    if (!window.confirm("Remove this order from history?")) return;
    try {
      const res = await axios.delete(`${url}/api/assignorder/history/remove/${assignedOrderId}`);
      if (res.data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== assignedOrderId));
      }
    } catch (error) {
      console.error("REMOVE ERROR 👉", error);
    }
  };

  // 🔹 Format milliseconds to mm:ss or hh:mm:ss
  const formatDuration = (ms) => {
    if (!ms || ms < 0) return "00m 00s";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  };

  // 🔹 Format Date object to readable string
  const formatTime = (dateObj) => {
    if (!dateObj) return "-";
    return dateObj.toLocaleString();
  };

  // 🔹 Compute live duration (from assigned -> now or delivered)
  const getLiveDuration = (assignedTime, deliveredTime) => {
    if (!assignedTime) return 0;
    const start = assignedTime.getTime();
    const end = deliveredTime ? deliveredTime.getTime() : currentTime.getTime();
    return end - start;
  };

  return (
    <div className="del-container">
      <button onClick={() => navigate(-1)}>⬅ Back</button>
      <h2>📝 Delivery Boy Order History</h2>

      {!loading && <p><b>Total Orders:</b> {orders.length}</p>}
      {loading && <p>Loading...</p>}
      {!loading && orders.length === 0 && <p>No order history found.</p>}

      {orders.map((assignedOrder, index) => {
        const durationMs = getLiveDuration(assignedOrder.assignedTime, assignedOrder.deliveredTime);

        return (
          <div key={assignedOrder._id} className="order-history-card">
            <h4>Order #{index + 1}</h4>

            <p><b>Assigned Order ID:</b> {assignedOrder._id}</p>
            <p><b>Order ID:</b> {assignedOrder.order?._id || "-"}</p>
            <p><b>Order Status:</b> {assignedOrder.order?.status || "-"}</p>
            <p><b>Delivery Status:</b> {assignedOrder.status || "-"}</p>
            <p><b>Amount:</b> ₹{assignedOrder.order?.amount || 0}</p>
            <p><b>Order Date:</b> {formatTime(assignedOrder.order?.createdAt ? new Date(assignedOrder.order.createdAt) : null)}</p>

            
            <p><b>Assigned At:</b> {formatTime(assignedOrder.assignedTime)}</p>
            <p><b>Pickup At:</b> {assignedOrder.pickupTime ? formatTime(assignedOrder.pickupTime) : "In Progress..."}</p>
            <p><b>Delivered At:</b> {assignedOrder.deliveredTime ? formatTime(assignedOrder.deliveredTime) : "In Progress..."} {assignedOrder.order?.status || "-"}</p>

            
            <p><b>Total Time:</b> {formatDuration(durationMs)}</p>

           
            <ul>
              {assignedOrder.order?.items?.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.quantity} – ₹{item.price || 0}
                  {item.linkdata && (
                    <a
                      href={item.linkdata}
                      target="_blank"
                      rel="noreferrer"
                      className="mapbtnps"
                    >
                      📍
                    </a>
                  )}
                </li>
              ))}
            </ul>

            
            <button
              className="remove-history-btn"
              onClick={() => removeHistory(assignedOrder._id)}
            >
              ❌ Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DelOrderHistory;

*/
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DelOrderHistory.css";
import { DelContext } from "../../DelContext/DelContext";

const DelOrderHistory = () => {
  const { url } = useContext(DelContext);

  const { delBoyId } = useParams();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ✅ Fetch all assigned orders of single delboy
  const fetchHistory = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await axios.get(`${url}/api/assignorder/history/${delBoyId}`);

      console.log("HISTORY DATA 👉", res.data);

      if (res.data.success) {
        setHistory(res.data.data || []);
      } else {
        setHistory([]);
        setMessage(res.data.message || "No history found");
      }
    } catch (error) {
      console.log("HISTORY ERROR 👉", error);
      setHistory([]);
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [delBoyId]);

  // ✅ Format Date
  const formatTime = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div className="del-history-page">
      <div className="del-history-top">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <h2>📝 Delivery Boy Order History</h2>
      </div>

      <div className="summary-box">
        <p>
          <b>DeliveryBoy ID:</b> {delBoyId}
        </p>
        <p>
          <b>Total Assigned Orders:</b> {history.length}
        </p>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {message && <p className="empty">{message}</p>}

      {!loading && history.length === 0 && !message && (
        <p className="empty">No order history found.</p>
      )}

      <div className="history-grid">
        {history.map((assignedOrder, index) => (
          <div key={assignedOrder._id} className="history-card">
            <div className="card-head">
              <h4>📦 Order #{index + 1}</h4>

              {/* AssignedOrder status */}
              <span className="status-badge">
                {assignedOrder.status || "assigned"}
              </span>
            </div>

            {/* AssignedOrder details */}
            <p>
              <b>AssignedOrder ID:</b> {assignedOrder._id}
            </p>

            <p>
              <b>Assigned At:</b> {formatTime(assignedOrder.assignedAt)}
            </p>

            <p>
              <b>Delivered At:</b>{" "}
              {assignedOrder.deliveredAt
                ? formatTime(assignedOrder.deliveredAt)
                : "Not Delivered"}
            </p>

            <hr />

            {/* Populated Order details */}
            <p>
              <b>Order ID:</b> {assignedOrder.order?._id || "-"}
            </p>

            <p>
              <b>Order Status:</b>{" "}
              {assignedOrder.order?.status || "No Status"}
            </p>

            <p>
              <b>Amount:</b> ₹{assignedOrder.order?.amount || 0}
            </p>

            <p>
              <b>Order Created:</b>{" "}
              {formatTime(assignedOrder.order?.createdAt)}
            </p>

            {/* Items */}
            <div className="items">
              <h5>🍔 Items</h5>

              {assignedOrder.order?.items?.length > 0 ? (
                <ul>
                  {assignedOrder.order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} × {item.quantity} — ₹{item.price || 0}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DelOrderHistory;
