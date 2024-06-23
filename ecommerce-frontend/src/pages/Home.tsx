import { Link } from "react-router-dom"
import { ProductCard } from "../components"

const Home = () => {

  const addToCartHandler = () => {
    console.log("Add to cart");
  }

  return (
    <div className="home">
        <section>
          <div>
            <h1>Buy Quality Products</h1>
            <p>From anywhere to anyone</p>
          </div>
        </section>
        
        <h1>Latest Product
          <Link to={"/search"} className="findmore" >
            More
          </Link>
        </h1>

        <main>
            <ProductCard 
              productId="product-1" 
              name="Macbook Air" 
              price={3423} 
              photo="https://m.media-amazon.com/images/I/71O14N5GYLL._AC_UY218_.jpg" 
              handler={addToCartHandler}
              stock={10}
            />
        </main>
    </div>
  )
}

export default Home
