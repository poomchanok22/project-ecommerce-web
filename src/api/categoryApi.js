import axios from "axios";

const categoryApi = axios.create({
  baseURL: "http://localhost:8888/api/category"
})


const addToken = (token) => ({
  headers : { Authorization : `Bearer ${token}`,
    "Content-Type": "application/json"}
})


export const creatCategory = (body, token) => categoryApi.post("/", body, addToken(token))

export const getAllCategory = (token) => categoryApi.get("/", addToken(token))

export const deleteCategory = (category_id, token) => categoryApi.delete(`${category_id}`, addToken(token))