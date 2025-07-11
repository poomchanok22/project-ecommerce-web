import React, { useEffect, useState } from 'react'
import useProductStore from '../stores/productStore'
import useUserStore from '../stores/userStore'
import useCategoryStore from '../stores/categoryStore'
import CategoryForm from '../components/CategoryForm'
import { toast } from 'react-toastify'
import ProductCardAdmin from '../components/ProductCardAdmin'
import ProductForm from '../components/ProductForm'
import ProductFormEdit from '../components/ProduFormEdit'


function Shop() {
const product = useProductStore(state => state.product)
const fetchProducts = useProductStore(state => state.fetchProducts)
const token = useUserStore(state => state.token)
const fetchCategory = useCategoryStore(state => state.fetchCategory)
const category = useCategoryStore(state => state.category)
const deleteCategory = useCategoryStore(state => state.deleteCategory)
const setCurrentProduct = useProductStore(state => state.setCurrentProduct)
const currentProduct = useProductStore(state => state.currentProduct)

const [isOpen, setIsOpen] = useState(false)
const [isOpenProductForm, setIsOpenProductForm] = useState(false)

  useEffect(()=> {
    if(isOpen) {
      document.getElementById('categoryform-modal').showModal()
    } else {
      document.getElementById('categoryform-modal').close()
    }
  },[isOpen])

    useEffect(()=> {
    if(isOpenProductForm) {
      document.getElementById('productform-modal').showModal()
    } else {
      document.getElementById('productform-modal').close()
    }
  },[isOpenProductForm])

useEffect(()=> {
  fetchProducts(token)
  fetchCategory(token)
},[])

const hdlDelete = async (category_id) => {
  try {
    const response = await deleteCategory(category_id,token)
      toast.success(response.data.message)

  } catch (err) {
    const errMsg = err.response?.data?.error || err.message
    toast.error(errMsg)
  }
}
 
  return (<>
    <div className='w-full border flex bg-[#FBF6EE]'>
      <div className='flex-1/5 ml-5'>
      <p className='text-5xl font-bold text-yellow-900'>Category</p>
      <div className='mt-10 text-3xl'>
      {category.map((category)=>(
        <label key={category.category_id} className="flex items-center gap-3 p-3 mb-2 rounded-xl bg-white shadow-md cursor-pointer transition hover:shadow-lg hover:bg-[#f0e9dc]">
          <div className='flex items-center gap-3 flex-1'>
            <input type="checkbox" className='checkbox checkbox-lg'/> 
          <span className="text-base font-medium text-gray-800">{category.name}</span>
          </div>
          
          <button className='btn btn-outline ml-auto' onClick={()=> hdlDelete(category.category_id)}>Delete</button>
        </label>
      ))}
      </div>
        <button className='btn btn-neutral w-full mt-10' onClick={()=> setIsOpen(true)}>Create Category</button>
      <div className='divider'></div>
        <button className='btn btn-soft w-full' onClick={()=> setIsOpenProductForm(true)}>Create Product</button>
      
      
      </div>
      <div className='flex-4/5 flex gap-10 flex-wrap mt-10 justify-center'>
      {product.map((product)=>(
        <ProductCardAdmin key={product.product_id} product={product} product_id={product.product_id} image={product.image} name={product.name} description={product.description} price={product.price} stock={product.stock}/>
      ))}
      
      
      </div>

    </div>
     <dialog id='categoryform-modal' className='modal' onClose={()=> setIsOpen(false)}>
      <div className='modal-box'>
        {isOpen && <CategoryForm />}
        <form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
					</form>
      </div>

    </dialog>

    <dialog id='productform-modal' className='modal' onClose={()=> setIsOpenProductForm(false)}>
      <div className='modal-box'>
        {isOpenProductForm && <ProductForm />}
        <form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
					</form>
      </div>

    </dialog>

    <dialog className='modal' id='productformedit-modal' onClose={()=>setCurrentProduct(null)}>
      <div className='modal-box'>
        {currentProduct && <ProductFormEdit />}
        <form method='dialog'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>X</button>
        </form>

      </div>

    </dialog>
    </>
  )
}

export default Shop
