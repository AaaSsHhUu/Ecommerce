import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { AdminSidebar, TableSkeleton } from "../../../components";
import { useOrderDetailsQuery } from "../../../redux/api/orderApi";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { Order, OrderItemType } from "../../../types/types";

const TransactionManagment = () => {

  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);

  const {id : orderId} = useParams();
  console.log("order id : ",orderId);
  
  const { data, isLoading, isError, error } = useOrderDetailsQuery(orderId as string);

  const defaultData: Order = {
    shippingInfo: {
      address: "77 White Street",
      city: "New-Delhi",
      state: "Phulera",
      country: "India",
      pinCode: "263661",
    },
    status: "Processing",
    subTotal: 0,
    discount: 0,
    tax: 0,
    shippingCharges: 0,
    total: 0,
    orderItems: [],
    user: {
      _id: "",
      name: ""
    },
    _id: ""
  }
console.log("Data : ", data);

  const {
    shippingInfo: {
      address,
      city,
      state,
      country,
      pinCode
    },
    orderItems,
    status,
    subTotal,
    discount,
    tax,
    shippingCharges,
    total,
    user: { name },

  } = data?.order || defaultData;

  const updateHandler = () => {

  }

  const deleteHandler = () => {

  }

  console.log("error : ", error);

  if (isError) <Navigate to={"/404"} />

  return (
    <>
      <div className="admin-container">
        <AdminSidebar />
        <main className="product-managment">
          {isLoading ? <TableSkeleton />
            :
            <>
              <section>
                <h2>Order Items</h2>

                {orderItems.map((item) => (
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
                <button onClick={deleteHandler} >Delete Order</button>
              </article>
            </>
          }
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
