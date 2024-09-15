import { ReactElement, useState, useEffect } from "react";
import { AdminSidebar, TableSkeleton } from "../../components"
import Table from "../../components/admin/Table";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAllProductsQuery } from "../../redux/api/productApi";
import { RootState, server } from "../../redux/store";
import toast from "react-hot-toast";
import { CustomError } from "../../types/api-types";
import { useSelector } from "react-redux";

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

  const {user} = useSelector((state : RootState) => state.userReducer);

  const {data, isLoading, isError, error} = useAllProductsQuery(user?._id!);
  
  if(isError){
      toast.error((error as CustomError).data.message);
  }

  useEffect(() => {
    if(data){
      setRows(data.products.map(i => ({
        photo : <img src={i.photo} />,
        name : i.name,
        price : i.price,
        stock : i.stock,
        action : <Link to={`/admin/product/${i._id}`}>Manage</Link>
      })))
    }
  },[data, isError, error, isLoading])

  return (
    <div className="admin-container">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main */}
        <main>
          {isLoading ? 
          <TableSkeleton /> 
          : 
          <Table<DataType> 
            columns={columns} 
            data={rows} 
            containerClassname="dashboard-product-box" 
            heading="Products" 
            showPagination={rows.length > 6 } 
          />}
        </main>

        <Link to={`/admin/product/new`} className="create-product-btn">{<FaPlus />}</Link>
    </div>
  )
}

export default Product
