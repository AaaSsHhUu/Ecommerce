import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Cart, Customer, Dashboard, Home, NewProduct, Product, ProductManagment, Search, TransactionManagment, Transactions } from "./pages";
import { Loader } from "./components";

function App() {

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Product />} />
          <Route path="/admin/transactions" element={<Transactions />} />
          <Route path="/admin/customers" element={<Customer />} />

          {/* Charts */}

          {/* Apps */}

          {/* Managment */}
          <Route path="/admin/products/new" element={<NewProduct />} />
          <Route path="/admin/products/:id" element={<ProductManagment />} />
          <Route path="/admin/transactions/:id" element={<TransactionManagment />} />

        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
