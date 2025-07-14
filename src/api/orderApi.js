import axios from "axios";

export const createOrderAndCheckout = async (items, total_price, token) => {
  const res = await axios.post(
    "http://localhost:8888/api/order/",
    {
      items,
      total_price,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const confirmPayment = async (session_id, order_id) => {
  const res = await axios.get(
    `http://localhost:8888/api/confirm?session_id=${session_id}&order_id=${order_id}`
  );
  return res.data;
};

export const fetchOrders = async (token) => {
  const res = await axios.get("http://localhost:8888/api/order", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.orders;
};
