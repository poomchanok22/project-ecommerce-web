import React, { useState } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { Link } from "react-router";
import useCartStore from "../stores/cartStore";
import useUserStore from "../stores/userStore";
import { useEffect } from "react";

const NavbarWithSidebar = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const token = useUserStore((state) => state.token);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (token) {
      fetchCart(token);
    }
  }, [token]);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-2 py-4 uppercase">
        <div className="text-xl">Clask & Crown</div>
        <div className="hidden md:flex gap-6 text-sm">
          <p className="hover:text-yellow-500 cursor-pointer">
            <Link to="/">Home</Link>
          </p>
          <p className="hover:text-yellow-500 cursor-pointer">About</p>
          <p className="hover:text-yellow-500 cursor-pointer">
            <Link to="/shop">Products</Link>
          </p>
          <p className="hover:text-yellow-500 cursor-pointer">Contact</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="reletive">
            <Link to="/cart">
              <ShoppingCart className="text-yellow-500 w-5 h-5 cursor-pointer" />
            </Link>
            {totalQuantity > 0 && (
              <span className="absolute top-3 right-14 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalQuantity}
              </span>
            )}
          </div>

          <p className="cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
            Menu
          </p>
        </div>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default NavbarWithSidebar;
