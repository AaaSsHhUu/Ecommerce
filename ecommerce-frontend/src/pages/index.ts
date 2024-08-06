import {lazy} from "react";

const Home = lazy(() => import("./Home"));
const Search = lazy(() => import("./Search"));
const Cart = lazy(() => import("./Cart"));
const Shipping = lazy(() => import("./Shipping"));
const Login = lazy(() => import("./Login"));
const NotFound = lazy(() => import("./NotFound"));
const Checkout = lazy(() => import("./Checkout"));

// Admin Pages
const Dashboard = lazy(() => import("./admin/Dashboard"));
const Product = lazy(() => import("./admin/Product"));
const Transactions = lazy(() => import("./admin/Transactions"));
const Customer = lazy(() => import("./admin/Customer"));
const NewProduct = lazy(() => import("./admin/managment/NewProduct"));
const ProductManagment = lazy(() => import("./admin/managment/ProductManagment"));
const TransactionManagment = lazy(() => import("./admin/managment/TransactionManagment"));
const BarCharts = lazy(() => import("./admin/charts/BarCharts"));
const PieCharts = lazy(() => import("./admin/charts/PieCharts"));
const LineCharts = lazy(() => import("./admin/charts/LineCharts"));


export {Home, Cart, Search,Dashboard, Product, Transactions, Customer, NewProduct, ProductManagment, TransactionManagment, BarCharts, PieCharts, LineCharts, Shipping, Login, NotFound, Checkout };

