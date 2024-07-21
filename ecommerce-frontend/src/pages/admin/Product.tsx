import { ReactElement, useState,useCallback, useEffect } from "react";
import { AdminSidebar } from "../../components"
import TableHOC from "../../components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAllProductsQuery } from "../../redux/api/productApi";
import { server } from "../../redux/store";
import toast from "react-hot-toast";
import { CustomError } from "../../types/api-types-";

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
    action : <Link to={"/admin/product/asjodwije"}>Manage</Link>
  },
  {
    photo : <img src={img2} alt="macbook two" />,
    name : "Macbook Two",
    price : 2599,
    stock : 7,
    action : <Link to={"/admin/product/asjodwwiuije"}>Manage</Link>
  },
  {
    photo : <img src={img1} alt="macbook one" />,
    name : "Macbook One",
    price : 2399,
    stock : 3,
    action : <Link to={"/admin/product/asjodwije"}>Manage</Link>
  },
  {
    photo : <img src={img2} alt="macbook two" />,
    name : "Macbook Two",
    price : 2599,
    stock : 7,
    action : <Link to={"/admin/product/asjodwwiuije"}>Manage</Link>
  },
  {
    photo : <img src={img1} alt="macbook one" />,
    name : "Macbook One",
    price : 2399,
    stock : 3,
    action : <Link to={"/admin/product/asjodwije"}>Manage</Link>
  },
  {
    photo : <img src={img2} alt="macbook two" />,
    name : "Macbook Two",
    price : 2599,
    stock : 7,
    action : <Link to={"/admin/product/asjodwwiuije"}>Manage</Link>
  },
  {
    photo : <img src={img1} alt="macbook one" />,
    name : "Macbook One",
    price : 2399,
    stock : 3,
    action : <Link to={"/admin/product/asjodwije"}>Manage</Link>
  },
  {
    photo : <img src={img2} alt="macbook two" />,
    name : "Macbook Two",
    price : 2599,
    stock : 7,
    action : <Link to={"/admin/product/asjodwwiuije"}>Manage</Link>
  },
];

const Product = () => {

  const [rows, setRows] = useState<DataType[]>(arr);

  const {data, isLoading, isError, error} = useAllProductsQuery("");

  if(error){
      toast.error((error as CustomError).data.message);
  }

  useEffect(() => {
    if(data){
      setRows(data.products.map(i => ({
        photo : <img src={`${server}/${i.photo}`} />,
        name : i.name,
        price : i.price,
        stock : i.stock,
        action : <Link to={`/admin/product/${i._id}`}>Manage</Link>
      })))
    }
  },[data])

  if(data){
      
  }

  const Table = useCallback(
    TableHOC<DataType>(columns,rows,"dashboard-product-box","Products",rows.length>6)
  ,[])

  return (
    <div className="admin-container">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main */}
        <main>
          {Table()}
        </main>

        <Link to={"/admin/product/new"} className="create-product-btn">{<FaPlus />}</Link>
    </div>
  )
}

export default Product
