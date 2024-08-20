import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type ProductCardProps = {
    productId : string;
    name : string;
    price : number;
    photo : string;
    stock : number;
    handler : (cartItem: CartItem) => string | undefined
}

const ProductCard = ({productId,name,price,photo,stock,handler} : ProductCardProps) => {
  return (
    <div className="product-card">
        <Link to={`product/${productId}`}>
          <img src={`${server}/${photo}`} alt={name} />
        </Link>

        <div className="product-card-details">
            <div className="description">
                <h3 className="product-name">
                  {name.length > 7 ? name.slice(0,7) + "..." : name}
                </h3>
                <h2 className="product-price">₹{price.toLocaleString("en-IN")}</h2>
            </div>
            {/* <button className="buy-btn" onClick={}>Buy now</button> */}
            <button className="cart-btn" onClick={() => handler({productId,name, photo, price, stock, quantity : 1})}>Add to Cart</button>
        </div>
    </div>
  )
}

export default ProductCard
