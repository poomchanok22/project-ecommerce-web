import React, { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import useProductStore from '../stores/productStore'
import useUserStore from '../stores/userStore'
import useCategoryStore from '../stores/categoryStore'


function Shop() {
const product = useProductStore(state => state.product)
const fetchProducts = useProductStore(state => state.fetchProducts)
const token = useUserStore(state => state.token)
const fetchCategory = useCategoryStore(state => state.fetchCategory)
const category = useCategoryStore(state => state.category)
useEffect(()=> {
  fetchProducts(token)
  fetchCategory(token)
},[])
 
  return (
    <div className='w-full border flex bg-[#FBF6EE]'>
      <div className='flex-1/5 ml-5'>
      <p className='text-5xl font-bold text-yellow-900'>Category</p>
      <div className='mt-10 text-3xl'>
      {category.map((category)=>(
        <label key={category.category_id} className="flex items-center gap-3 p-3 mb-2 rounded-xl bg-white shadow-md cursor-pointer transition hover:shadow-lg hover:bg-[#f0e9dc]">
          <input type="checkbox" className='checkbox checkbox-lg'/> 
          <span className="text-base font-medium text-gray-800">{category.name}</span>
        </label>
      ))}

      </div>
      
     
      
      </div>
      <div className='flex-4/5 flex gap-10 flex-wrap mt-10 justify-center'>
      {product.map((product)=>(
        <ProductCard key={product.product_id} product_id={product.product_id} image={product.image} name={product.name} description={product.description} price={product.price} stock={product.stock}/>
      ))}
      
      
      </div>
    </div>
  )
}

export default Shop
