import { create } from "zustand"
import {createProduct, deleteProduct, getAllProduct, editProduct} from "../api/productsApi"
import useUserStore from "../stores/userStore"

let token = useUserStore.getState().token

const useProductStore = create((set, get) => ({
  product: [],
  currentProduct: null,
  loading: false,
  error: null,

  fetchProducts: async () =>{
    set({loading:true, error:null})

    try {
      const response = await getAllProduct(token)
      console.log("response.data", response.data)
      set({product: response.data.products, loading: false})
    } catch (err) {
      set({error: err.message, loading: false})
    }
  },

  deleteProductById: async (product_id) => {
    set({loading:true, error:null})
    try {
      const response = await deleteProduct(product_id, token)
      get().fetchProducts()
      return response
    } catch (err) {
      set({error: err.message, loading: false})
    }

  },

  createProduct: async (body, token, user) => {
  set({ loading :true})
    try {
      const response = await createProduct(body, token)

    const newProduct ={
      ...response.data.result,
      create: user
    }

    set(state => ({
      product: [newProduct, ...state.product]
    }))
    return response
    } catch (err) {
    set({ error: err.response?.data?.error || err.message })
    throw err
    } finally {
      set({ loading : false})
    }
  },

  setCurrentProduct: (product) => set({ currentProduct: product}),

  updateProduct: async (product_id, body) => {
    set({loading : true})
    const response = await editProduct(product_id, body, token)
    get().fetchProducts()
    return response
    
  }

}))

export default useProductStore