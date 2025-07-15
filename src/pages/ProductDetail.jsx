import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import useUserStore from '../stores/userStore'
import useProductStore from '../stores/productStore'
import {BackIcon} from "../icons"

function ProductDetail() {
  const token = useUserStore(state => state.token)
  const product = useProductStore(state => state.product)
  const fetchSingleProduct = useProductStore(state => state.fetchSingleProduct)
  const loading = useProductStore(state => state.loading)
  const error = useProductStore(state => state.error)
  const {product_id} = useParams()

  useEffect(() => {
    fetchSingleProduct(product_id, token)
  }, [product_id, token])

  if (loading) return <div className="p-10 text-3xl">Loading...</div>
  if (error) return <div className="p-10 text-red-500 text-3xl">{error}</div>

  return (
    <div className="p-10 bg-[#FBF6EE] min-h-screen w-full flex flex-col gap-5">
      <Link to="/shop">
      <div className='btn btn-primary w-[200px] h-[40px] rounded-xl flex justify-start cursor-pointer'>
      <BackIcon className="w-8" />
      <p>Back</p>
      </div>
      </Link>
      

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 flex gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-1/3 object-cover rounded-xl"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-yellow-900">{product.name}</h1>
          <p className="mt-4 text-gray-700 text-lg">{product.description}</p>
          <p className="mt-6 text-3xl font-semibold text-yellow-800">
            ราคา {product.price} บาท
          </p>
          <p className="mt-2 text-gray-600">Stock: {product.stock}</p>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail
