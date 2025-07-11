import axios from "axios";

const productsApi = axios.create({
  baseURL: "http://localhost:8888/api/products"
})

const addToken = (token) => ({
  headers : { Authorization : `Bearer ${token}`}
})

export const createProduct = (body, token) => productsApi.post("/", body, addToken(token))

export const getProductById = (product_id) => productsApi.get(`/${product_id}`)

export const getAllProduct = (token) => productsApi.get("/", addToken(token))

export const deleteProduct = (product_id, token) => productsApi.delete(`${product_id}`, addToken(token))

export const editProduct =  (product_id, body, token) => productsApi.patch(`/${product_id}`, body, addToken(token))