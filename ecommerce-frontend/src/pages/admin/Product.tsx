import { ReactElement, useState, useEffect } from "react";
import { AdminSidebar, TableSkeleton } from "../../components"
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

const Product = () => {

  const [rows, setRows] = useState<DataType[]>([]);

  const {data, isLoading, isError, error} = useAllProductsQuery("");
  
  if(isError){
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
  },[data, isError, error, isLoading])

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    (rows.length > 6)
  )

  return (
    <div className="admin-container">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main */}
        <main>
          {isLoading ? <TableSkeleton /> : Table()}
        </main>

        <Link to={"/admin/product/new"} className="create-product-btn">{<FaPlus />}</Link>
    </div>
  )
}

export default Product
