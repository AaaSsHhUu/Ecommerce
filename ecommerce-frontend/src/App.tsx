import { onAuthStateChanged } from "firebase/auth";
import { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer, Header, Loader, ProtectedRoute } from "./components";
import { auth } from "./firebase";
import { BarCharts, Cart, Checkout, Orders, Customer, Dashboard, Home, LineCharts, Login, NewProduct, NotFound, PieCharts, Product, ProductManagment, Search, Shipping, TransactionManagment, Transactions, ProductDetail } from "./pages";
import { getUser } from "./redux/api/userApi";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { UserReducerInitialState } from "./types/reducer-types";


function App() {
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }
    ) => state.userReducer)
  const dispatch = useDispatch();
  // Firebase provides an onAuthStateChanged method to observe the user's sign-in state. This method takes a callback function that runs whenever the user's authentication state changes.
  // To check if any user has logged in or not
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log("Logged in user : ", user);
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else {
        // console.log("Not logged in");
        dispatch(userNotExist());
      }
    })
  }, []);

  return (
    loading ? <Loader /> :
      <Router>
        {/* Header */}
        <Header user={user} />

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={
              <ProtectedRoute isAuthenticated={user ? false : true} >
                <Login />
              </ProtectedRoute>
            } />

            <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />} >
              <Route path="/orders" element={<Orders />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/pay" element={<Checkout />} />
            </Route>


            {/* Admin Routes */}
            <Route element={<ProtectedRoute adminOnly={true} isAuthenticated={user ? true : false} admin={user?.role === "admin"} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/product" element={<Product />} />
              <Route path="/admin/transaction" element={<Transactions />} />
              <Route path="/admin/customer" element={<Customer />} />

              {/* Charts */}
              <Route path="/admin/chart/bar" element={<BarCharts />} />
              <Route path="/admin/chart/pie" element={<PieCharts />} />
              <Route path="/admin/chart/line" element={<LineCharts />} />

              {/* Managment */}
              <Route path="/admin/product/new" element={<NewProduct />} />
              <Route path="/admin/product/:id" element={<ProductManagment />} />
              <Route path="/admin/transaction/:id" element={<TransactionManagment />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      </Router>
  )
}

export default App
