import { useState } from "react"
import { ProductCard } from "../components";

const Search = () => {

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const addToCartHandler = () => {};
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
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  min={100}
                  max={100000}
                />
            </div>

            <div>
                <h4>Category</h4>
                <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All</option>
                    <option value="">Sample 1</option>
                    <option value="">Sample 2</option>
                </select>
            </div>
        </aside>

        <main>
            <h1>Products</h1>
            <input type="text" 
              placeholder="Search By Name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="product-container">
              <ProductCard 
                productId="product-1" 
                name="Macbook Air" 
                price={113423} 
                photo="https://m.media-amazon.com/images/I/71O14N5GYLL._AC_UY218_.jpg" 
                handler={addToCartHandler}
                stock={10}
              />
            </div>

            <article>
                <button 
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >Prev</button>
                <span>{page} of {4}</span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === 4}
                >Next</button>
            </article>
        </main>
    </div>
  )
}

export default Search
