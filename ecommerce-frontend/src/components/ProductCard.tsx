import { Link } from "react-router-dom";
import { server } from "../redux/store";

type ProductCardProps = {
    productId : string;
    name : string;
    price : number;
    photo : string;
    stock : number;
    handler : () => void
}

const handleBuyProduct = () => {
    console.log("Buy");
}

const handleAddToCart = () => {
  console.log("Added to cart");
  
}

const ProductCard = ({productId,name,price,photo,stock,handler} : ProductCardProps) => {
  return (
    <Link to={"/"} className="product-card">
        <img src={`${server}/${photo}`} alt={name} />

        <div className="product-details">
            <div className="description">
                <h3 className="product-name">
                  {name.length > 7 ? name.slice(0,7) + "..." : name}
                </h3>
                <h2 className="product-price">₹{price.toLocaleString("en-IN")}</h2>
            </div>
            <button className="buy-btn" onClick={handleBuyProduct}>Buy now</button>
            <button className="cart-btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>
    </Link>
  )
}

export default ProductCard
