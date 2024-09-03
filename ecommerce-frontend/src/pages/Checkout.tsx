import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useNewOrderMutation } from "../redux/api/orderApi";
import { NewOrderRequest } from "../types/api-types";
import { resetCart } from "../redux/reducer/cartReducer";
import { responseToast } from "../utils/features";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state : RootState) => state.userReducer);

  const {
    shippingInfo,
    cartItems,
    shippingCharges,
    subTotal,
    discount,
    tax,
    total
  } = useSelector((state : RootState) => state.cartReducer);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [newOrder] = useNewOrderMutation();

  const submitHandler = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!stripe || !elements) return ;

    setIsProcessing(true);

    const orderData : NewOrderRequest = {
      shippingInfo,
      orderItems : cartItems,
      shippingCharges,
      subTotal,
      tax,
      discount,
      total,
      user : user?._id!
    };

    const {paymentIntent, error} = await stripe.confirmPayment({
      elements,
      confirmParams : { return_url : window.location.origin },
      redirect : "if_required"
    })

    if(error){
      setIsProcessing(false);
      console.log("error : ", error);
      return toast.error(error.message || "Something went wrong");
    } 

    if(paymentIntent.status === "succeeded"){
      const res = await newOrder(orderData);
      dispatch(resetCart());
      responseToast(res, navigate, "/orders");
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
  const location = useLocation();
  console.log("location : ", location);

  const clientSecret : string | undefined = location.state;
  
  if(!clientSecret) return <Navigate to={"/shipping"} />
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  )
}

export default Checkout