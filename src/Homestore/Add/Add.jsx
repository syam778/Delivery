import React, { useState, useEffect } from "react";
import axios from "axios";

const Add = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = "http://localhost:3000/api"; // your backend base URL

  // ✅ Fetch delivery boys list
  const fetchDeliveryBoys = async () => {
    try {
      const res = await axios.get(`${url}/delvery/get`); // adjust your endpoint
      if (res.data.success) {
        setDeliveryBoys(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching delivery boys:", error);
    }
  };

  // ✅ Toggle online/offline
  const toggleStatus = async (id, currentStatus) => {
    try {
      const res = await axios.post(
        `${url}/delboy/${currentStatus ? "offline" : "online"}`,
        { id }
      );

      if (res.data.success) {
        fetchDeliveryBoys(); // refresh list after toggle
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  // ✅ Poll every 5 seconds for realtime update
  useEffect(() => {
    fetchDeliveryBoys();
    const interval = setInterval(fetchDeliveryBoys, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="delivery-boy-page">
      <h2>Delivery Boys</h2>
      {loading && <p>Loading...</p>}

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Area</th>
            <th>Status</th>
            <th>Orders</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {deliveryBoys.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No delivery boys found
              </td>
            </tr>
          ) : (
            deliveryBoys.map((boy) => (
              <tr key={boy._id}>
                <td>{boy.name}</td>
                <td>{boy.number}</td>
                <td>{boy.area}</td>
                <td style={{ color: boy.online ? "green" : "red" }}>
                  {boy.online ? "Online" : "Offline"}
                </td>
                <td>
                  {boy.orders && boy.orders.length > 0 ? (
                    <ul>
                      {boy.orders.map((order, index) => (
                        <li key={index}>
                          {order.item} - {order.address}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No Orders"
                  )}
                </td>
                <td>
                  <button
                    onClick={() => toggleStatus(boy._id, boy.online)}
                    style={{
                      background: boy.online ? "red" : "green",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    {boy.online ? "Go Offline" : "Go Online"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Add;
