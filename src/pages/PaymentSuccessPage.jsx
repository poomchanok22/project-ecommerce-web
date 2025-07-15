import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { confirmPayment } from "../api/orderApi";
import useCartStore from "../stores/cartStore";

function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const clearCart = useCartStore(state => state.clearCart)
  const navigate = useNavigate()

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    const order_id = searchParams.get("order_id");

    if (session_id && order_id) {
      confirmPayment(session_id, order_id).then((data) => {
        console.log(data);
        clearCart()

        setTimeout(() => {
          navigate("/")
        },3000)
      });
    }
  }, []);

  return (
    <div className="p-10 text-center flex justify-center items-center flex-col w-full h-screen">
      <h1 className="text-3xl font-bold mb-4"> Payment completed successfully!</h1>
      <p>You can check your orders on the order history page.</p>
    </div>
  );
}

export default PaymentSuccessPage;
