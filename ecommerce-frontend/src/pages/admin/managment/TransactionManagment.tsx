import { useState } from "react"
import { AdminSidebar } from "../../../components"
import { Link } from "react-router-dom";
import { OrderItemType, OrderType } from "../../../types/types"

const TransactionManagment = () => {

  const orderItems: OrderItemType[] = [
    {
      _id: "ajncwjnc",
      name: "Nike Shoes",
      price: 2000,
      quantity: 50,
      photo: "https://m.media-amazon.com/images/I/71jDjaFd2cL._AC_UL320_.jpg"
    }
  ]

  const [order, setOrder] = useState<OrderType>({
    _id: "smkdcmowi",
    name: "Nike Shoes",
    address: "77 White Street",
    city: "New-Delhi",
    state: "Phulera",
    country: "India",
    pinCode: 263661,
    status: "Processing",
    subTotal: 4000,
    discount: 1200,
    tax: 200,
    shippingCharges: 0,
    total: 4000 + 200 + 0 - 1200,
    orderItems
  });

  const {
    name,
    address,
    city,
    country,
    state,
    pinCode,
    subTotal,
    shippingCharges,
    discount,
    tax,
    total,
    status
  } = order;

  const updateHandler = () => {
    setOrder((prev) => (
      {
        ...prev,
        status : prev.status === "Processing" ? "Shipped" : "Delivered"
      }
    ))
  }

  return (
    <>
      <div className="admin-container">
          <AdminSidebar />
          <main className="product-managment">
            <section>
              <h2>Order Items</h2>

              {order.orderItems.map((item) => (
                <OrderItemCard 
                  name={item.name}
                  photo={item.photo} 
                  price={item.price} 
                  quantity={item.quantity} 
                  _id={item._id} 
                />
              ))}
            </section>

            <article className="shipping-info-card">
              <h1>Order Info</h1>
              <h5>User Info</h5>
              <p>Name : {name}</p>
              <p>
                Address : {`
                            ${address},
                            ${city}, ${state},
                            ${country} - ${pinCode}
                          `}
              </p>

              <h5>Amount Info</h5>
              <p>Subtotal : {subTotal}</p>
              <p>Shipping charges : {shippingCharges}</p>
              <p>Tax : {tax}</p>
              <p>Discount : {discount}</p>
              <p>Total : {total}</p>

              <h5>Status Info</h5>
              <p>Status : &nbsp;
                <span
                  className={
                    status === "Delivered" ? "purple" : 
                    status === "Shipped" ? "green" : "red"
                  }
                >{status}</span>
              </p>

              <button onClick={updateHandler} >Process Status</button>
            </article>
          </main>
      </div>
    </>
  )
}

const OrderItemCard = ({ name, photo, price, quantity, _id }: OrderItemType) => {
  return (
    <div className="transaction-product-card">
      <img src={photo} alt={name} />
      <Link to={`/product/${_id}`}>{name}</Link>
      <span>${price} x {quantity} = ${price * quantity} </span>
    </div>
  )
}

export default TransactionManagment
