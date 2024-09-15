import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartItem } from "../types/types";

type CartItemProps = {
    cartItem: CartItem;
    increaseQuantity : (cartItem : CartItem) => void;
    decreaseQuantity : (cartItem : CartItem) => void;
    removeCartItemHandler : (productId : string) => void;
}

const CartItemCard = ({ cartItem, increaseQuantity, decreaseQuantity, removeCartItemHandler }: CartItemProps) => {

    const { productId, name, photo, price, quantity } = cartItem;

    return (
        <div className="cart-item">
            <img src={photo} alt={name} />
            <article>
                <Link to={`/product/${productId}`}>{name}</Link>
                <span>₹{price}</span>
            </article>

            <div>
                <button onClick={() => decreaseQuantity(cartItem)}>-</button>
                <p>{quantity}</p>
                <button onClick={() => increaseQuantity(cartItem)}>+</button>
            </div>

            <button onClick={() => removeCartItemHandler(productId)}>
                <FaTrash />
            </button>
        </div>
    )
}

export default CartItemCard
