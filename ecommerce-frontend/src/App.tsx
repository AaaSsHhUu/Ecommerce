import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { BarChart, Cart, Customer, Dashboard, Home, LineChart, NewProduct, PieChart, Product, ProductManagment, Search, TransactionManagment, Transactions } from "./pages";
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
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/transaction" element={<Transactions />} />
          <Route path="/admin/customer" element={<Customer />} />

          {/* Charts */}
          <Route path="/admin/chart/bar" element={<BarChart />} />
          <Route path="/admin/chart/pie" element={<PieChart />} />
          <Route path="/admin/chart/line" element={<LineChart />} />
          
          {/* Apps */}

          {/* Managment */}
          <Route path="/admin/product/new" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<ProductManagment />} />
          <Route path="/admin/transaction/:id" element={<TransactionManagment />} />

        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
