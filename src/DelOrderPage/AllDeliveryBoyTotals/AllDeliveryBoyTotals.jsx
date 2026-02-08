import { useEffect, useState } from "react";
import axios from "axios";
//import "./AllDeliveryBoyTotals.css";

const BASE_URL = "http://localhost:3000/api/order";

const AllDeliveryBoyTotals = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchTotals = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.get(`${BASE_URL}/all-deliveryboy-totals`);

      if (res.data.success) {
        setList(res.data.data || []);
        if (res.data.data.length === 0) setMessage("No delivery boys found");
      } else {
        setMessage(res.data.message || "Failed to load data");
      }
    } catch (err) {
      console.error("FETCH TOTALS ERROR 👉", err);
      setMessage("Server error while fetching totals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotals();
  }, []);

  return (
    <div className="all-totals-container">
      <h2>🚚 All Delivery Boys – Total Orders</h2>

      {loading && <p>Loading...</p>}
      {message && <p className="msg">{message}</p>}

      <table className="totals-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>UserSpecialId</th>
            <th>Total Orders</th>
            <th>Delivered</th>
            <th>Pending</th>
          </tr>
        </thead>
        <tbody>
          {list.map((boy, index) => (
            <tr key={boy._id}>
              <td>{index + 1}</td>
              <td>{boy.name}</td>
              <td>{boy.userSpecialId}</td>
              <td>{boy.totalOrders}</td>
              <td style={{ color: "green" }}>{boy.deliveredCount}</td>
              <td style={{ color: "orange" }}>{boy.pendingCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDeliveryBoyTotals;