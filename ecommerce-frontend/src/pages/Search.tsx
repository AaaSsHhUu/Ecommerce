import { ChangeEvent, useState } from "react"
import { ProductCard, ProductSkeleton } from "../components";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types-";

interface FilterProps{
  search : string;
  sort : "asc" | "dsc" | "";
  maxPrice : number;
  category : string;
  page : number;
}

const Search = () => {

  const [filters, setFilters] = useState<FilterProps>({
    search : "",
    sort : "",
    maxPrice : 100000,
    category : "",
    page : 1
  })


  const { 
    data : searchResponse, 
    isLoading : searchLoading, 
    isError : productIsError , 
    error :  productError 
  } = useSearchProductsQuery({
    price : filters.maxPrice,
    page : filters.page,
    search : filters.search,
    sort : filters.sort,
    category : filters.category
  })

  const {
      data : categoriesResponse,
      isLoading : categoryLoading,
      isError,
      error
  } = useCategoriesQuery("");


  const handleFilterChange = (e : ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = e.target;
    setFilters({
      ...filters,
      [name] : name === "maxPrice" ? Number(value) : value
    })
  }

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
            value={filters.sort}
            onChange={handleFilterChange}
          >
            <option value="">None</option>
            <option value="asc">Price(Low to High)</option>
            <option value="dsc">Price(High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price : {filters.maxPrice || ""} </h4>
          <input type="range"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            min={100}
            max={100000}
            step={100}
            name="maxPrice"
          />
        </div>

        <div>
          <h4>Category</h4>
          <select name="category" value={filters
            .category} onChange={handleFilterChange}>
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
          value={filters.search}
          name="search"
          onChange={handleFilterChange}
        />

        {
          searchLoading ? 
          <>
            {
              Array.from({length : 8}, (_,idx) => {
                return <ProductSkeleton key={idx}/>
              })
            }
          </>
          :
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
        }

        {searchResponse && searchResponse?.totalPages > 1 && 
        <article>
          <button
            onClick={() => setFilters({...filters, page : filters.page - 1 })}
            disabled={filters.page === 1}
          >Prev</button>
          <span>{filters.page} of {searchResponse?.totalPages || 1}</span>
          <button
            onClick={() => setFilters({...filters, page : filters.page + 1 })}
            disabled={filters.page === searchResponse?.totalPages}
          >Next</button>
        </article>}
      </main>
    </div>
  )
}

export default Search
