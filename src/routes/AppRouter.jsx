import {lazy, Suspense} from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router"
import UserLayout from "../Layouts/UserLayout"
import useUserStore from "../stores/userStore"

const Login = lazy(()=> import("../pages/LoginPage"))
const Home = lazy(()=> import("../pages/Home"))
const Shop = lazy(()=> import("../pages/Shop"))
const Cart = lazy(()=> import("../pages/Cart"))
const Payment = lazy(()=> import("../pages/Payment"))
const Order = lazy(()=> import("../pages/Order"))
const ShopAdmin = lazy(() => import("../pages/ShopAdmin"))
const PaymentSuccess = lazy(() => import("../pages/PaymentSuccessPage"))


const guestRouter = createBrowserRouter([
  {path: "/", element: <Login />},
  {path: "*", element: <Navigate to='/' />}
])

const userRouter = createBrowserRouter([
  {
    path: '/', element: <UserLayout/>,
    children: [
      {index: true, element: <Home />},
      {path: "shop", element:<Shop />},
      {path: "cart", element:<Cart />},
      {path: "payment", element:<Payment />},
      {path: "order", element:<Order />},
      {path: "payment-success", element: <PaymentSuccess />},
      {path: "*", element: <Navigate to='/' />}
    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: '/', element: <UserLayout />,
    children: [
      {index: true, element: <ShopAdmin />},
      {path: "*", element: <Navigate to="/" />}
    ]
  }
])


function AppRouter() {
  const user = useUserStore(state => state.user)
  console.log(user)

  let finalRouter
  if(!user) {
    finalRouter = guestRouter
  } else if (user.role === "USER") {
    finalRouter = userRouter
  } else if (user.role === "ADMIN") {
    finalRouter = adminRouter
  } else {
    finalRouter = guestRouter
  }

  
  return(
    <Suspense fallback={<p>Loading....</p>}>
      <RouterProvider key={user?.id} router={finalRouter}/>
    </Suspense>
    
  )
}

export default AppRouter