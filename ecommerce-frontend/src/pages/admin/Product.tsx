import { ReactElement, useState,useCallback } from "react";
import { AdminSidebar } from "../../components"
import TableHOC from "../../components/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

interface DataType{
  photo : ReactElement;
  name : string;
  price : number;
  stock : number;
  action : ReactElement;
}

const columns : Column<DataType>[] = [
  {
    Header : "Photo",
    accessor : "photo"
  },
  {
    Header : "Name",
    accessor : "name"
  },
  {
    Header : "Price",
    accessor : "price"
  },
  {
    Header : "Stock",
    accessor : "stock"
  },
  {
    Header : "Action",
    accessor : "action"
  },
]

const img1 = "https://m.media-amazon.com/images/I/71f5Eu5lJSL._AC_UY218_.jpg";

const img2 = "https://m.media-amazon.com/images/I/61ldExf7mbL._AC_UY218_.jpg"


const arr : DataType[] = [
  {
    photo : <img src={img1} alt="macbook one" />,
    name : "Macbook One",
    price : 2399,
    stock : 3,
    action : <Link to={"/admin/products/asjodwije"}>Manage</Link>
  },
  {
    photo : <img src={img2} alt="macbook two" />,
    name : "Macbook Two",
    price : 2599,
    stock : 7,
    action : <Link to={"/admin/products/asjodwwiuije"}>Manage</Link>
  },
  {
    photo : <img src={img1} alt="macbook one" />,
    name : "Macbook One",
    price : 2399,
    stock : 3,
    action : <Link to={"/admin/products/asjodwije"}>Manage</Link>
  },
  {
    photo : <img src={img2} alt="macbook two" />,
    name : "Macbook Two",
    price : 2599,
    stock : 7,
    action : <Link to={"/admin/products/asjodwwiuije"}>Manage</Link>
  },
  {
    photo : <img src={img1} alt="macbook one" />,
    name : "Macbook One",
    price : 2399,
    stock : 3,
    action : <Link to={"/admin/products/asjodwije"}>Manage</Link>
  },
  {
    photo : <img src={img2} alt="macbook two" />,
    name : "Macbook Two",
    price : 2599,
    stock : 7,
    action : <Link to={"/admin/products/asjodwwiuije"}>Manage</Link>
  },
  {
    photo : <img src={img1} alt="macbook one" />,
    name : "Macbook One",
    price : 2399,
    stock : 3,
    action : <Link to={"/admin/products/asjodwije"}>Manage</Link>
  },
  {
    photo : <img src={img2} alt="macbook two" />,
    name : "Macbook Two",
    price : 2599,
    stock : 7,
    action : <Link to={"/admin/products/asjodwwiuije"}>Manage</Link>
  },
];

const Product = () => {

  const [data] = useState<DataType[]>(arr);
  const Table = useCallback(
    TableHOC<DataType>(columns,data,"dashboard-product-box","Products",data.length>6)
  ,[])

  return (
    <div className="adminContainer">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main */}
        <main>
          {Table()}
        </main>

        <Link to={"/admin/products/new"} className="create-product-btn">{<FaPlus />}</Link>
    </div>
  )
}

export default Product
