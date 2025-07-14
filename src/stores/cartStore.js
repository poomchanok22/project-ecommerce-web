import { create } from "zustand"
import {
  fetchCartApi,
  addToCartApi,
  removeFromCartApi,
  updateQuantityApi
} from "../api/cartApi"

const useCartStore = create((set, get) => ({
  cartItems: [],
  cartId: null,



  fetchCart: async (token) => {
    try {
      const res = await fetchCartApi(token)
      set({ cartItems: res.data.cartItems, cartId: res.data.cartId })
    } catch (err) {
      console.error("Fetch cart failed:", err)
    }
  },

  addToCart: async (product_id, quantity, token) => {
    try {
      await addToCartApi({ product_id, quantity }, token)
      get().fetchCart(token)
    } catch (err) {
      console.error("Add to cart failed:", err)
    }
  },

  removeFromCart: async (cart_item_id, token) => {
    try {
      await removeFromCartApi(cart_item_id, token)
      get().fetchCart(token)
    } catch (err) {
      console.error("Remove from cart failed:", err)
    }
  },

  updateQuantity: async (cart_item_id, quantity, token) => {
    try {
      await updateQuantityApi(cart_item_id, { quantity }, token)
      get().fetchCart(token)
    } catch (err) {
      console.error("Update quantity failed:", err)
    }
  },

  clearCart: () => set({ cartItems: [], cartId: null })
}))

export default useCartStore
