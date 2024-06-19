import {lazy} from "react";

const Home = lazy(() => import("./Home"));
const Search = lazy(() => import("./Search"));
const Cart = lazy(() => import("./Cart"));
const Dashboard = lazy(() => import("./admin/Dashboard"));
const Product = lazy(() => import("./admin/Product"));
const Transactions = lazy(() => import("./admin/Transactions"));
const Customer = lazy(() => import("./admin/Customer"));
const NewProduct = lazy(() => import("./admin/managment/NewProduct"));
const ProductManagment = lazy(() => import("./admin/managment/ProductManagment"));
const TransactionManagment = lazy(() => import("./admin/managment/TransactionManagment"));
const BarChart = lazy(() => import("./admin/charts/BarChart"));
const PieChart = lazy(() => import("./admin/charts/PieChart"));
const LineChart = lazy(() => import("./admin/charts/LineChart"));

export {Home, Cart, Search,Dashboard, Product, Transactions, Customer, NewProduct, ProductManagment, TransactionManagment, BarChart, PieChart, LineChart };

