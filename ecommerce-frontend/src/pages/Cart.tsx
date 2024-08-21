import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { CartItemCard } from "../components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../types/types";
import { addToCart, applyDiscount, calculatePrice, removeCartItem } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import axios from "axios";
import { RootState, server } from "../redux/store";

const Cart = () => {

  const {
    cartItems,
    subTotal,
    tax,
    total,
    discount,
    shippingCharges,
  } = useSelector((state: RootState) => state.cartReducer);

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const {token, cancel} = axios.CancelToken.source();
    // The axios.CancelToken.source() function is used to create a cancel token that allows you to cancel an Axios request.

    const timeOutId = setTimeout(() => {
      axios.post(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {cancelToken : token})
      .then((res) => {
          setIsValidCoupon(true);
          dispatch(applyDiscount(res.data.discount));
      })
      .catch(() => {
          setIsValidCoupon(false);
          dispatch(applyDiscount(0));
      })
    }, 1000)

    return () => {
        clearTimeout(timeOutId);
        cancel();        
        setIsValidCoupon(false);
    }
  }, [couponCode])


  useEffect(() => {
    dispatch(calculatePrice());
  },[cartItems, discount])

  const removeCartItemHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
    toast.success("Item Removed");
  }

  const increaseQuantity = (cartItem: CartItem) => {
    if (cartItem.quantity < cartItem.stock) {
      dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
    }
    else {
      return toast.error("Out of Stock");
    }
  }

  const decreaseQuantity = (cartItem: CartItem) => {
    if (cartItem.quantity > 1) {
      dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    }
    else {
      return toast.error("Quantity cannot be less than 1");
    }
  }

  return (
    <div className="cart">
      <main>
        {
          cartItems.length > 0 ?
            (
              cartItems.map((item, idx) => (
                <CartItemCard key={idx} cartItem={item} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeCartItemHandler={removeCartItemHandler} />
              ))
            )
            :
            (
              <h1>Cart is Empty</h1>
            )
        }
      </main>

      <aside>
        <p>Subtotal : ₹{subTotal}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>Tax : ₹{tax}</p>
        <p>Discount : <em className="green">₹{discount}</em></p>
        <p><b>Total : ₹{cartItems.length > 0 ? total : 0}</b></p>

        <input type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter Coupon Code"
        />

        {
          couponCode &&
          (
            isValidCoupon ?
              <span className="green">
                ₹{discount} off using the {couponCode}
              </span>
              :
              <span className="red">
                Invalid Coupon <VscError />
              </span>
          )
        }

        {
          cartItems.length > 0 &&
          <Link to={"/shipping"} className="checkout-btn">Checkout</Link>
        }
      </aside>
    </div>
  )
}

export default Cart
