import {lazy} from "react";

const Home = lazy(() => import("./Home"));
const Search = lazy(() => import("./Search"));
const Cart = lazy(() => import("./Cart"));
const Dashboard = lazy(() => import("./admin/Dashboard"));
const Product = lazy(() => import("./admin/Product"));
const Transactions = lazy(() => import("./admin/Transactions"));
const Customer = lazy(() => import("./admin/Customer"));

export {Home, Cart, Search,Dashboard, Product, Transactions, Customer};

