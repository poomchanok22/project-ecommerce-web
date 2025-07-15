import React from 'react'
import useCartStore from '../stores/cartStore'
import useUserStore from '../stores/userStore'
import { toast } from 'react-toastify'


function ProductCard({product_id, image, name, description, price, stock, }) {
  const token = useUserStore(state => state.token)
  const addToCart = useCartStore(state => state.addToCart)

const hdlAddToCart = async () => {
  try {
    await addToCart(product_id, 1, token)
  } catch (err) {
    toast.error("เกิดข้อผิดพลาดในการเพิ่มสินค้า")
    console.error(err)
  }
}





  return (
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
    <div className="flex items-center justify-between border-t border-gray-200 pt-5">
      <div className="text-lg text-yellow-400 font-semibold">
        <p className="text-sm font-normal text-red-600 mr-2">ราคา {price} บาท</p>
      </div>
      <div className="space-x-2">
        <button className='btn btn-neutral' onClick={hdlAddToCart}>Add to Cart</button>
      </div>
    </div>
  </div>
</div>
  )
}

export default ProductCard
