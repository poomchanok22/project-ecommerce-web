import React, { useState } from 'react'
import { ShoppingCart, Menu } from 'lucide-react'
import Sidebar from './Sidebar'
import { Link } from 'react-router'

const NavbarWithSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-2 py-4 uppercase">
        <div className="text-xl">Clask & Crown</div>
        <div className="hidden md:flex gap-6 text-sm">
          <p className="hover:text-yellow-500 cursor-pointer"><Link to="/">Home</Link></p>
          <p className="hover:text-yellow-500 cursor-pointer">About</p>
          <p className="hover:text-yellow-500 cursor-pointer"><Link to="/shop">Products</Link></p>
          <p className="hover:text-yellow-500 cursor-pointer">Contact</p>
        </div>
        <div className="flex gap-4 items-center">
          <Link to="/cart">
          <ShoppingCart className="text-yellow-500 w-5 h-5 cursor-pointer"/>
          </Link>
          
          <p className="cursor-pointer" onClick={() => setIsSidebarOpen(true)}>Menu</p>
        </div>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  )
}

export default NavbarWithSidebar
