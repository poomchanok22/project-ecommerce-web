import React, { useState } from 'react'
import useUserStore from '../stores/userStore'
import useCategoryStore from '../stores/categoryStore'
import { toast } from 'react-toastify'

function CategoryForm() {
const user = useUserStore(state => state.user)
const token = useUserStore(state => state.token)
const createCategories = useCategoryStore(state => state.createCategories)
console.log("token", token)

const [name, setName] = useState('')

const hdlCreateCategory = async () => {
  try {
    
  const body = {name}
  console.log("body",body)
  const response = await createCategories(body, token, user)
  toast.success(response.data.message)
  document.getElementById('categoryform-modal').close()
  } catch (err) {
    const errMsg = err.response?.data.error || err.message
    toast.error(errMsg)
  }
}




  
  return (
    <div className='flex flex-col justify-center'>
      <p  className='text-4xl font-bold text-center'>Category</p>
      <div className='divider'></div>
      <label className='flex flex-col gap-2'>
        <p>Name:</p>
        <input type="text"
        value={name}
        onChange={e=>setName(e.target.value)} 
        placeholder='Enter category name'
        className='input w-full'
        />
      </label>
      <div className='divider'></div>
      <button className='btn btn-neutral' onClick={hdlCreateCategory}>Create</button>
    </div>
  )
}

export default CategoryForm
