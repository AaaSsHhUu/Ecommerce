import { useCallback, useState } from "react"
import { ProductCard } from "../components";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types-";

const Search = () => {

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data : searchResponse, isLoading : searchLoading } = useSearchProductsQuery({
    price : maxPrice,
    page,
    category,
    search,
    sort
  })

  const debounce = function(cb : any,delay = 1000){
    let timeout : any; 
    return (...args : any) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
         return cb(args)
        },delay)
      }
  }

  const handleMaxPriceChange = (value : number) => {
      setMaxPrice(value);
  }

  const debounceMaxPriceChange = useCallback(debounce(handleMaxPriceChange,500),[])

  const {
      data : categoriesResponse,
      isLoading : categoryLoading,
      isError,
      error
  } = useCategoriesQuery("");

  console.log("search res : ", searchResponse);
  console.log("category res : ", categoriesResponse);

  if(isError){
      toast.error((error as CustomError).data.message);
  }

  const addToCartHandler = () => { };

  return (
    <div className="search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select name="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">Price(Low to High)</option>
            <option value="dsc">Price(High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price : {maxPrice || ""} </h4>
          <input type="range"
            value={maxPrice}
            onChange={(e) => debounceMaxPriceChange(Number(e.target.value))}
            min={100}
            max={100000}
            name="maxPrice"
          />
        </div>

        <div>
          <h4>Category</h4>
          <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            {
              categoryLoading === false && categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))
            }
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input type="text"
          placeholder="Search By Name..."
          value={search}
          name="search"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="product-container">
          {
            searchResponse?.products.map(i => <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              photo={i.photo}
              handler={addToCartHandler}
              stock={i.stock}
            />)
          }
        </div>

        <article>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >Prev</button>
          <span>{page} of {searchResponse?.totalPages || 1}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === searchResponse?.totalPages}
          >Next</button>
        </article>
      </main>
    </div>
  )
}

export default Search
