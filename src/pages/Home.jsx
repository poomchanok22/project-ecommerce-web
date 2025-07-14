import backgroundBar from "../assets/edgar-chaparro-Lwx-q6OdGAc-unsplash.jpg"
import alcohol from "../assets/bernd-dittrich-vdOQ4ItLu_I-unsplash.jpg"
import FeaturedProductCard from "../components/FeaturedProductCard";
import useProductStore from "../stores/productStore"
import { useEffect } from "react";
import useUserStore from "../stores/userStore";
import { Link } from "react-router"

export default function HomePage() {
  const product = useProductStore(state => state.product)
  const fetchProducts = useProductStore(state => state.fetchProducts)
  const token = useUserStore(state => state.token)
  



  useEffect(() =>{
    fetchProducts(token)
  },[])

  return (
    <div className="bg-white w-full">
      {/* Hero Section */}
      <div
        className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundBar})` }}
      >
        <div className="flex flex-col text-center gap-10 items-center">
          <h1 className="text-5xl font-extrabold tracking-widest mb-4">
            DISCOVER THE TASTE OF ROYALTY
          </h1>
          <Link to="/shop"><button className="btn btn-neutral rounded-full px-6 w-[200px]">SHOP NOW</button></Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="mx-auto py-16 px-4 text-center w-full bg-[#FBF6EE]">
        <h2 className="text-3xl font-bold tracking-widest mb-10">FEATURED PRODUCTS</h2>
        <div className="flex flex-wrap justify-center gap-15">
          {product.slice(0,3).map((product) => (
            <FeaturedProductCard key={product.product_id} product_id={product.product_id} image={product.image}  name={product.name} price={product.price} />
          ))}
          
          

        </div>
      </div>

      {/* Legacy Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h3 className="text-3xl font-bold tracking-widest mb-6">
            THE LEGACY OF CRAFTSMANSHIP
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, id tristique phasellus egestas integer pretium. Lorem maecenas nisl semper ut a consequat. Orci interdum libero nisl integer arcu ac at. Ornare egestas ultrices nunc in cras.
          </p>
        </div>
        <div className="flex-1 h-64 bg-gray-200 rounded-xl overflow-hidden">
          <img src={alcohol} className=""/>
        </div>
      </div>
    </div>
  );
} 
