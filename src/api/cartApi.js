import axios from "axios"

const cartApi = axios.create({
  baseURL: "http://localhost:8888/api/cart"
})

const addToken = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const fetchCartApi = (token) => cartApi.get("/", addToken(token))
export const addToCartApi = (body, token) => cartApi.post("/", body, addToken(token))
export const removeFromCartApi = (cart_item_id, token) => cartApi.delete(`/${cart_item_id}`, addToken(token))
export const updateQuantityApi = (cart_item_id, body, token) => cartApi.patch(`/${cart_item_id}`, body, addToken(token))
