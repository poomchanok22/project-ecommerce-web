import React from 'react'
import blackLabel from "../assets/allwhisky_black_label_all-devices.webp"
import useProductStore from '../stores/userStore'
import useUserStore from '../stores/userStore'
import useCartStore from '../stores/cartStore'
import { toast } from 'react-toastify'

function FeaturedProductCard({product_id,image, name, price}) {
  const product = useProductStore(state => state.product)
  const fetchProducts = useProductStore(state => state.fetchProducts)
  const token = useUserStore(state => state.token)
  const addToCart = useCartStore(state => state.addToCart)

const hdlAddToCart = async () => {
  try {
    await addToCart(product_id, 1, token)
    toast.success("เพิ่มสินค้าลงตะกร้าแล้ว")
  } catch (err) {
    toast.error("เกิดข้อผิดพลาดในการเพิ่มสินค้า")
    console.error(err)
  }
}
  return (
    <div className='w-[350px] h-[550px] rounded-2xl shadow-lg overflow-hidden flex flex-col shadow-2xl'>
      
      {/* Image Section */}
      <div className='rounded-2xl h-[350px] w-full overflow-hidden flex items-start justify-center pt-5'>
        <img
          src={image}
          alt='Black Label Whisky'
          className='h-full w-auto rounded-2xl'
        />
      </div>

      {/* Info Section */}
      <div className='p-4 flex flex-col justify-between flex-grow'>
        <div>
          <h2 className='text-xl font-bold text-yellow-700 mb-1'>{name}</h2>
          <p className='text-sm text-gray-600'>ราคา {price} บาท</p>
        </div>

        <button className='btn btn-neutral' onClick={hdlAddToCart}>
          Add to Cart
        </button>
      </div>
      
    </div>
  )
}

export default FeaturedProductCard
