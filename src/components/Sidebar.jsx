import React from 'react'
import clsx from 'clsx'
import useUserStore from '../stores/userStore'
import { Link } from 'react-router'

const Sidebar = ({ isOpen, onClose }) => {
  const logout = useUserStore(state => state.logout)
  const user = useUserStore(state => state.user)
  return (
    <>
      <div
        className={clsx(
          'fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <span className="font-bold tracking-widest text-3xl">MENU</span>
          <button className="text-lg" onClick={onClose}>✕</button>
        </div>
        <ul className="flex flex-col p-4 gap-4 text-lg font-semibold tracking-widest uppercase">
          <li className='text-blue-400'>User : {user.name}</li>
          <li className="hover:text-yellow-500 cursor-pointer"><Link to="/cart" onClick={onClose}>Cart</Link></li>
          <li className="hover:text-yellow-500 cursor-pointer"><Link to="/order" onClick={onClose}>Order</Link></li>
          <li className="text-red-500 hover:text-red-700 cursor-pointer"><a onClick={logout}>Logout</a></li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
    </>
  )
}

export default Sidebar
