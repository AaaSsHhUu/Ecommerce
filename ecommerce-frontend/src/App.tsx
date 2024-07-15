import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { BarCharts, Cart, Customer, Dashboard, Home, LineCharts, Login, NewProduct, PieCharts, Product, ProductManagment, Search, Shipping, Signup, TransactionManagment, Transactions } from "./pages";
import { Header, Loader } from "./components";
import {Toaster} from "react-hot-toast";

function App() {

  return (
    <Router>
      {/* Header */}
      <Header />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/transaction" element={<Transactions />} />
          <Route path="/admin/customer" element={<Customer />} />

          {/* Charts */}
          <Route path="/admin/chart/bar" element={<BarCharts />} />
          <Route path="/admin/chart/pie" element={<PieCharts />} />
          <Route path="/admin/chart/line" element={<LineCharts />} />
          
          {/* Apps */}

          {/* Managment */}
          <Route path="/admin/product/new" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<ProductManagment />} />
          <Route path="/admin/transaction/:id" element={<TransactionManagment />} />

        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </Router>
  )
}

export default App
