import { create } from "zustand";
import { createOrderAndCheckout, fetchOrders } from "../api/orderApi";
import axios from "axios";


const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  createCheckoutSession: async (items, totalPrice, token) => {
    try {
      const data = await createOrderAndCheckout(items, totalPrice, token);
      return data.checkoutUrl;
    } catch (err) {
      set({ error: err.message });
    }
  },

  loadOrders: async (token) => {
    set({ loading: true });
    try {
      const orders = await fetchOrders(token);
      set({ orders });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  retryCheckout: async (order_id, token) => {
    try {
      const res = await axios.get(`http://localhost:8888/api/order/retry/${order_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data)
      return res.data.url;
    } catch (err) {
      console.error("Retry checkout failed:", err);
      return null;
    }
  },
  cancelOrder : async (order_id, token) => {
    try {
      const response = await axios.patch(
      `http://localhost:8888/api/order/${order_id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    get().loadOrders(token);
    } catch (err) {
      console.error("Error cancelling order:", err)
    }
  }
}));

export default useOrderStore;