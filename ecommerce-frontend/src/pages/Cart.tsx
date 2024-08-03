import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { CartItemCard } from "../components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import { addToCart, calculatePrice, removeCartItem } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";

const Cart = () => {

  const {
    cartItems,
    subtotal,
    tax,
    total,
    discount,
    shippingCharges,
  } = useSelector((state: { cartReducer: CartReducerInitialState }) => state.cartReducer);

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (couponCode === "Ashu2004") {
      setIsValidCoupon(true);
    }
    else {
      setIsValidCoupon(false);
    }
  }, [couponCode])


  useEffect(() => {
    dispatch(calculatePrice());
  },[cartItems])

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
        <p>Subtotal : ₹{subtotal}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>Tax : ₹{tax}</p>
        <p>Discount : <em className="green">₹{discount}</em></p>
        <p><b>Total : ₹{total}</b></p>

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
                ₹{discount} off using the <code>{couponCode}</code>
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
