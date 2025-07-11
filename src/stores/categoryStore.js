import { create } from "zustand"
import { getAllCategory, creatCategory, deleteCategory } from "../api/categoryApi"
import useUserStore from "./userStore"

const token = useUserStore.getState().token


const useCategoryStore = create((set, get) => ({
  category: [],
  loading: false,
  error: null,

  fetchCategory: async (token) => {
    
    set({loading:true, error:null})

    try {
      const response = await getAllCategory(token)
      console.log("response.data",response.data)
      set({category: response.data.data, loading: false})
    } catch (err) {
      set({error: err.message, loading: false})
    }
  },

  createCategories: async (body, token, user) =>  {
    set({loading: true})

    
      const response = await creatCategory(body, token)
      
      const newCategory ={
        ...response.data.data,
        create: user
      }
  
      set(state => ({
        loading: false,
        category: [newCategory, ...state.category]
      }))

      return response 
  },

  deleteCategory: async(category_id, token) => {
    try {
      const response = await deleteCategory(category_id, token)
      get().fetchCategory(token)
      return response
    } catch (err){
      console.log(err)
    }
  }
}))

export default useCategoryStore