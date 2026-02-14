import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const DelContext = createContext(null);

const DelContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [query, setQuery] = useState('');
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);


  //const url ="https://backend2-3-vwf9.onrender.com"



  //const url = "http://localhost:3000"; // change to your live backend if needed
  const url = "https://backend2-5-2t0w.onrender.com" //last


  // Audio
  const wonAudio = new Audio('/Audios/done.mp3');
  const doneAudio = new Audio('/Audios/error.mp3');
  const submitAudio = new Audio('/Audios/submit2.mp3');
  const addAudio = new Audio('/Audios/add.mp3');
  const timeAudio = new Audio('/Audios/ontime.mp3');

  // Add to Cart
  const addToCart = async (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));

    addAudio.play();

    if (token) {
      try {
        await axios.post(`${url}/api/card/add`, { itemId }, { headers: { token } });
      } catch (err) {
        console.error("Add to cart error:", err.message);
      }
    }
  };

  // Remove from Cart
  const removeFromCart = async (itemId) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });

    doneAudio.play();

    if (token) {
      try {
        await axios.post(`${url}/api/card/remove`, { itemId }, { headers: { token } });
      } catch (err) {
        console.error("Remove from cart error:", err.message);
      }
    }
  };

  // Total amount
  const getTotalAmount = () => {
    let total = 0;
    for (const [itemId, quantity] of Object.entries(cartItems)) {
      if (quantity > 0) {
        const item = food_list.find(f => f._id.toString() === itemId);
        if (item) total += item.price * quantity;
      }
    }
    return total;
  };

  // Fetch food list
  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      setFoodList(res.data.data || []);
    } catch (err) {
      console.error("Fetch food list error:", err.message);
    }
  };

  // Load cart from backend
  const loadCartData = async (token) => {
    try {
      const res = await axios.post(`${url}/api/card/get`, {}, { headers: { token } });
      setCartItems(res.data.cardData || {});
    } catch (err) {
      console.error("Load cart error:", err.message);
      setCartItems({});
    }
  };

  // Load initial data
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (token) {
        await loadCartData(token);
      }
      setLoading(false);
    }
    loadData();
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    fetchFoodList,
    loadCartData,
    url,
    token,
    setToken,
    query,
    setQuery,
    wonAudio,
    doneAudio,
    submitAudio,
    addAudio,
    timeAudio,
    loading,
  };

  return (
    <DelContext.Provider value={contextValue}>
      {!loading && children}
    </DelContext.Provider>
  );
};

export default DelContextProvider;
