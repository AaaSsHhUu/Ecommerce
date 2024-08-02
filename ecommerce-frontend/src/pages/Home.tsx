import { Link } from "react-router-dom"
import { Carousel, ProductCard, ProductSkeleton } from "../components"
import { useLatestProductsQuery } from "../redux/api/productApi"
import toast from "react-hot-toast";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {

  const {data, isLoading, isError} = useLatestProductsQuery("");

  const dispatch = useDispatch();
  
  const addToCartHandler = (cartItem : CartItem) => {
    if(cartItem.stock < 1) return toast.error("Item is Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Added To Cart");
  }

  if(isError){
      toast.error("Cannot Fetch Products");
  }

  return (
    <div className="home">
        <section>
          <Carousel />
        </section>

        <div className="title">
          <p>Latest Product</p>
          <Link to={"/search"} className="findmore" >
            More
          </Link>
        </div>

        <main>
          {
            isLoading ? 
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </> 
            : 
            data?.products.map((product) => 
                <ProductCard 
                  key={product._id}
                  productId={product._id}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  handler={addToCartHandler}
                  photo={product.photo}
                />
            )
          }
        </main>


    </div>
  )
}

export default Home
