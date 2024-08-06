import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe('pk_test_51PcNZyIUFaxFMHVGSQ6RW3uvSBp9JVUNcUQtS6nrO6JddAKQRQkNVtJa4apRkWKvVYsmtqmbN41AxNItj3Y1JQPQ00mKo1mvsU')

const CheckoutForm = () => {

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const submitHandler = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!stripe || !elements) return ;

    setIsProcessing(true);

    const order = {};

    const {paymentIntent, error} = await stripe.confirmPayment({
      elements,
      confirmParams : { return_url : window.location.origin },
      redirect : "if_required"
    })

    if(error){
      setIsProcessing(false);
      return toast.error(error.message || "Something went wrong");
    } 

    if(paymentIntent.status === "succeeded"){
        console.log("Placing order");
        navigate("/orders");
    }

    setIsProcessing(false);
  }
  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
          <PaymentElement />
          <button disabled={isProcessing}>{isProcessing ? "Processing..." : "Pay"}</button>
      </form>
    </div>
  )
}

const Checkout = () => {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret : "pi_3PkgUuIUFaxFMHVG2gk6Tdob_secret_TmmUwKapHehn3xahHTz6ZyCjG"}}>
      <CheckoutForm />
    </Elements>
  )
}

export default Checkout