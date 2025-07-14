// src/pages/Order.jsx
import { useEffect } from "react"
import useOrderStore from "../stores/orderStore"
import useUserStore from "../stores/userStore"
import { format } from "date-fns"

function OrderPage() {
  const token = useUserStore(state => state.token)
  const orders = useOrderStore(state => state.orders)
  const loadOrders = useOrderStore(state => state.loadOrders)
  const loading = useOrderStore(state => state.loading)
  const retryCheckout = useOrderStore(state => state.retryCheckout)

  const handleRetryCheckout = async (order_id) => {
  const url = await retryCheckout(order_id, token);
  console.log("url",url)
  console.log("order_id", order_id)
  if (url) {
    window.location.href = url;
  }
};


  useEffect(() => {
    if (token) loadOrders(token)
  }, [token])

  if (loading) return <p className="p-4">กำลังโหลดคำสั่งซื้อ...</p>

  return (
    <div className="w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ประวัติคำสั่งซื้อ</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีคำสั่งซื้อ</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.order_id}
            className="border rounded-xl shadow-md mb-6 p-4 bg-white"
          >
            <div className="flex justify-between mb-2">
              <div> รหัส: <b>{order.order_id}</b></div>
              <div className="text-sm text-gray-600">
                {format(new Date(order.oder_date), "dd MMM yyyy HH:mm")}
              </div>
            </div>
            <div className="mb-2">
              สถานะ:{" "}
              <span className={`font-semibold ${order.status === "PAID" ? "text-green-600" : "text-red-500"}`}>
                {order.status}
              </span>
            </div>
            <div className="mb-2">ราคารวม: {order.total_price} บาท</div>

            <div className="ml-2">
              <p className="font-medium">สินค้า:</p>
              <ul className="list-disc pl-6">
                {order.orderItems.map((item) => (
                  <li key={item.order_item_id}>
                    {item.product?.name} - {item.quantity} x {item.price_per_unit} บาท
                  </li>
                ))}
              </ul>
              
            </div> 

          <div className="flex justify-end gap-2">
            {
              order.status === "PENDING" ? <div>
              <button className="btn btn-neutral" onClick={()=> handleRetryCheckout(order.order_id)}>จ่ายเงิน</button> 
              </div> : ""
            }  

            {
              order.status === "PENDING" ? <div>
              <button className="btn btn-outline">Cancel Order</button> 
              </div> : ""
            }
          </div>
            
            
            
          </div>
        ))
      )}
    </div>
  )
}

export default OrderPage
