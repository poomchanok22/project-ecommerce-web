import useCartStore from "../stores/cartStore"
import useUserStore from "../stores/userStore"
import useOrderStore from "../stores/orderStore"
import { useEffect } from "react"

function CartPage() {
  const { cartItems, fetchCart, updateQuantity, removeFromCart } = useCartStore()
  const token = useUserStore(state => state.token)
  const createCheckoutSession = useOrderStore(state => state.createCheckoutSession)
 
  useEffect(() => {
    if (token) fetchCart(token)
  }, [token])

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.product?.price ?? 0
    return sum + price * item.quantity
  }, 0)

  const handleCheckout = async () => {
    const items = cartItems.map((item) => ({
      product_id: item.product.product_id,
      quantity: item.quantity,
      price_per_unit: item.product.price,
      product_name: item.product.name,
    }));

    const url = await createCheckoutSession(items, totalPrice, token);
    if (url) window.location.href = url;
  };

  return (
    <div className="p-8 max-w-3xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.cart_item_id} className="flex justify-between items-center border-b py-4 gap-2">
              <div className="flex w-full justify-between">
                <p className="font-semibold">{item.product?.name || "ชื่อสินค้าไม่พบ"}</p>
                <p>
                  ราคา: {item.product?.price ?? "-"} บาท x {item.quantity} ={" "}
                  {item.product?.price ? item.product.price * item.quantity : "-"} บาท
                </p>
                <p>
                  จำนวน:
                  <input
                    type="number"
                    min="0"
                    className="ml-2 border px-2 w-16"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.cart_item_id, parseInt(e.target.value), token)
                    }
                  />
                </p>
              </div>
              <button
                className="btn btn-sm btn-error"
                onClick={() => removeFromCart(item.cart_item_id, token)}
              >
                ลบสินค้า
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold">ราคารวมทั้งหมด: {totalPrice} บาท</p>
            <button className="btn btn-primary mt-4" onClick={handleCheckout}>ดำเนินการชำระเงิน</button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage
