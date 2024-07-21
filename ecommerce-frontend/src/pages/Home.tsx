import { Link } from "react-router-dom"
import { Carousel, ProductCard, Skeleton } from "../components"
import { useLatestProductsQuery } from "../redux/api/productApi"
import toast from "react-hot-toast";

const Home = () => {

  const {data, isLoading, isError} = useLatestProductsQuery("");

  const addToCartHandler = () => {
    console.log("Add to cart");
  }

  if(isError){
      toast.error("Cannot Fetch Products");
  }

  return (
    <div className="home">
        <section>
          <Carousel />
        </section>

        {/* Sidebar  */}
        
        
        <div className="title">
          <p>Latest Product</p>
          <Link to={"/search"} className="findmore" >
            More
          </Link>
        </div>

        <main>
          {
            isLoading ? <Skeleton /> : 
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
