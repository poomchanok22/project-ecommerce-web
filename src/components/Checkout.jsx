import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import useUserStore from "../stores/userStore";
import { checkOut } from "../api/checkout";
const stripePromise = loadStripe(
  "pk_test_51RjJvCQfiZrStS9m0HXPda8NI6eErGh3q56qvfSOGWSY4Mgcno1N1yRJtUKcjNkMzk4lIRcPq9RxrHm2pmvOwuwb00KOA477je"
);
function Checkout() {
  const token = useUserStore(state => state.token)
  const user = useUserStore(state => state.user)

  const fetchClientSecret = async()=> {
    try {
      const res = await checkOut(token, user.id)
      

      return res.data.clientSecret
    } catch(error) {
      console.log(error)
    }
  }

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export default Checkout;
