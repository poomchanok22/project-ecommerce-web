import React, { useState } from 'react'
import useProductStore from '../stores/productStore'
import useUserStore from '../stores/userStore'
import { toast } from 'react-toastify'

function ProductCardAdmin({product, product_id, image, name, description, price, stock, }) {

const token = useUserStore(state => state.token)
const deleteProductById = useProductStore(state => state.deleteProductById)
const setCurrentProduct = useProductStore(state => state.setCurrentProduct)

const [confirmDeleteProduct, setConfirmDeleteProduct] = useState(null)

// console.log("product", product)

const openConfirmDeleteProduct = (product_id) => {
  setConfirmDeleteProduct(product_id)
  document.getElementById(`confirm-delete-product-modal-${product_id}`).showModal()
}

const hdlShowModal = () => {
  setCurrentProduct(product)
  document.getElementById("productformedit-modal").showModal()
}

const hdlDelete = async (product_id) => {
  try {
    const response = await deleteProductById(product_id,token)
      toast.success(response.data.message)

  } catch (err) {
    const errMsg = err.response?.data?.error || err.message
    toast.error(errMsg)
  }
}


  return (
    <>
    <div className="w-96 relative shadow-2xl mx-auto my-12 rounded-lg overflow-hidden group">
  
  <div className="flex items-center justify-center h-[400px] w-[400px] p-12 overflow-hidden">
    <img src={image} alt="" className="max-w-full max-h-full rounded-2xl"/>
  </div>

    <div className="absolute top-4 right-4 bg-yellow-900 text-white px-3 py-1 rounded-full text-sm font-medium 
                  opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 
                  transition-all duration-500 pointer-events-none z-10">
    คงเหลือ {stock} ชิ้น
  </div>

  <div className="p-8">
    <h4 className="text-2xl font-bold uppercase mb-4 text-yellow-700 hover:text-yellow-400 transition">
      <p>{name}</p>
    </h4>
    <p className="text-sm leading-6 mb-4 text-gray-500">{description}</p>
    <div className='divider'></div>
    <div className="flex items-center pt-5 gap-2">
      <div className="text-lg text-yellow-400 font-semibold flex-1">
        <p className="text-sm font-normal text-red-600 mr-2">ราคา {price} บาท</p>
      </div>
      <div className="space-x-2">
        <button className='btn btn-neutral' onClick={hdlShowModal}>Edit</button>
      </div>
      <div className="space-x-2">
        <button className='btn btn-outline' onClick={()=> openConfirmDeleteProduct(product_id)}>Delete</button>
      </div>
    </div>
  </div>
</div>

<dialog id={`confirm-delete-product-modal-${product_id}`} className="modal" onClose={() => setConfirmDeleteProduct(null)}>
  <div className="modal-box text-center">
    <h3 className="font-bold text-lg mb-4">Are you sure you want to delete this product?</h3>
    <div className="flex justify-center gap-4">
      <button
        className="btn btn-error"
        onClick={() => {
          hdlDelete(confirmDeleteProduct)
          setConfirmDeleteProduct(null)
          document.getElementById(`confirm-delete-product-modal-${product_id}`).close()
        }}
      >
        Yes
      </button>
      <form method="dialog">
        <button
          className="btn"
          onClick={() => setConfirmDeleteProduct(null)}
        >
          No
        </button>
      </form>
    </div>
  </div>
</dialog>
    </>
  )
}

export default ProductCardAdmin
