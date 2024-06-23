import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { CartItem } from "../components";
import { Link } from "react-router-dom";

const Cart = () => {
  const subtotal = 4000;
  const cartItems = [
    {
      productId : "abcdefgh",
      photo : "https://m.media-amazon.com/images/I/71O14N5GYLL._AC_UY218_.jpg",
      name : "Macbook Air" ,
      price : 130000,
      stock : 10,
      quantity : 1     
    },
    {
      productId : "abcdefgh",
      photo : "https://m.media-amazon.com/images/I/61Ps2D+ktAL._AC_UL320_.jpg",
      name : "Macbook Air" ,
      price : 130000,
      stock : 10,
      quantity : 1     
    },
    {
      productId : "abcdefgh",
      photo : "https://m.media-amazon.com/images/I/61I22cL7v+L._AC_UL320_.jpg",
      name : "Macbook Air" ,
      price : 130000,
      stock : 10,
      quantity : 1     
    },
  ];
  const tax = Math.abs(subtotal * 0.18);
  const shippingCharges = 200;
  const discount = 400;
  const total = subtotal + tax + shippingCharges - discount;

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);


  useEffect(() => {
    if(couponCode === "Ashu2004"){
      setIsValidCoupon(true);
    }
    else{
      setIsValidCoupon(false);
    }
  },[couponCode])
  return (
    <div className="cart">
      <main>
        {
          cartItems.length > 0 ? 
          (
            cartItems.map((item,idx) => (
            <CartItem key={idx} cartItem={item} />
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
