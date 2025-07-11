import { Outlet } from "react-router"
import Navbar from "../components/NavBar"

function UserLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="relative flex gap-2 w-full">
        <Outlet />
      </div>
    </div>
  )
} 

export default UserLayout
