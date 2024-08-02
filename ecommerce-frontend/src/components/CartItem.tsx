import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { removeCartItem } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";

type CartItemProps = {
    cartItem: any
}

const CartItem = ({ cartItem }: CartItemProps) => {

    const { productId, name, photo, price, quantity } = cartItem;

    const dispatch = useDispatch();

    const removeCartItemHandler = (productId : string) => {
        dispatch(removeCartItem(productId));
        toast.success("Item Removed");
    }

    return (
        <div className="cart-item">
            <img src={`${server}/${photo}`} alt={name} />
            <article>
                <Link to={`/product/${productId}`}>{name}</Link>
                <span>₹{price}</span>
            </article>

            <div>
                <button>-</button>
                <p>{quantity}</p>
                <button>+</button>
            </div>

            <button onClick={() => removeCartItemHandler(productId)}>
                <FaTrash />
            </button>
        </div>
    )
}

export default CartItem
