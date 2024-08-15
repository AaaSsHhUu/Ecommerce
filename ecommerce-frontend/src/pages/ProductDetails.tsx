import { CarouselButtonType, MyntraCarousel, Slider } from "6pp";
import { useState } from "react";
import { useProductDetailsQuery } from "../redux/api/productApi";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import toast from "react-hot-toast";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { ProductDetailSkeleton } from "../components";

const ProductDetails = () => {
    const {id : productId} = useParams();
    const dispatch = useDispatch();
    
    const {data, isLoading, isError, error} = useProductDetailsQuery(productId || "");
    const [carouselOpen, setCarouselOpen] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);

    const increment = () => {
        if(data?.product.stock! > quantity){
            setQuantity((prev) => prev + 1);
        }
        else{
            toast.error("Not Enough Stock");
        }
    }
    const decrement = () => {
        setQuantity((prev) => prev - 1);
    }

    const handleAddToCart = (cartItem : CartItem) => {
        if(cartItem.stock <= 0){
            toast.error("Out of Stock");
        }

        dispatch(addToCart(cartItem));
        toast.success("Added to Cart");
    }

    if(error){
        console.log("error : ", error);
        
    }

    if(isError) return <Navigate to={"/404"} />

  return (
    <div className="product-details">
        {isLoading ? <ProductDetailSkeleton />
         :
         <main>
            <section>
                <Slider
                    showThumbnails
                    showNav={false}
                    onClick={() => setCarouselOpen(true)}
                    images={[data?.product.photo || ""]}
                />
                {
                    carouselOpen && (
                        <MyntraCarousel 
                            NextButton={NextButton}
                            PrevButton={PrevButton}
                            setIsOpen={setCarouselOpen}
                            images={[data?.product.photo || ""]}
                        />
                    )
                }
            </section>

            <section>
                <code>{data?.product.category}</code>
                <h1>{data?.product.name}</h1>
                <h3>{data?.product.price}</h3>
                <article>
                    <div>
                        <button onClick={decrement} disabled={quantity <= 1}>-</button>
                        <span>{quantity}</span>
                        <button onClick={increment}>+</button>
                    </div>
                    <button
                        onClick={() => handleAddToCart({
                            productId : data?.product._id!,
                            name : data?.product.name!,
                            price : data?.product.price!,
                            stock : data?.product.stock!,
                            quantity,
                            photo : data?.product.photo!
                        })}
                    >Add To Cart</button>
                </article>
            </section>
        </main>
        }
    </div>
  )
}


const NextButton : CarouselButtonType = ({onClick}) => (
    <button onClick={onClick} className="carousel-btn">
        <FaArrowRightLong />
    </button>
)
const PrevButton : CarouselButtonType = ({onClick}) => (
    <button onClick={onClick} className="carousel-btn">
        <FaArrowLeftLong />
    </button>
)
export default ProductDetails