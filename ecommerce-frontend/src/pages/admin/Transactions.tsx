import { ReactElement, useEffect, useState } from "react";
import { AdminSidebar, TableSkeleton } from "../../components"
import { Column } from "react-table";
import Table from "../../components/admin/Table";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";
import { useAllOrdersQuery } from "../../redux/api/orderApi";
import { CustomError } from "../../types/api-types-";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface DataType{
  user : string;
  amount : number;
  discount : number;
  quantity : number;
  status : ReactElement;
  action : ReactElement;
}

const columns : Column<DataType>[] = [
  {
    Header : "Users",
    accessor : "user"
  },
  {
    Header : "Amount",
    accessor : "amount"
  },
  {
    Header : "Discount",
    accessor : "discount"
  },
  {
    Header : "Quantity",
    accessor : "quantity"
  },
  {
    Header : "Status",
    accessor : "status"
  },
  {
    Header : "Action",
    accessor : "action"
  },
]

const Transactions = () => {

  const {user} = useSelector((state : {userReducer : UserReducerInitialState}) => state.userReducer);

  const {isLoading, data, isError, error} = useAllOrdersQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  if(isError){
    const err = error as CustomError;
    return toast.error(err.data.message);
  }

  useEffect(() => {
    if(data?.orders.length){
      setRows(
        data.orders.map((i) => ({
          user : i.user.name,
          amount : i.total,
          discount : i.discount,
          quantity : i.orderItems.length,
          status : <span className={
              i.status === "Processing" ? "red" 
              : i.status === "Shipped" ? "green" 
              : "purple"
            }>{i.status}</span>,
          action : <Link to={`/admin/transaction/${i._id}`}>Manage</Link>
        }))
      )
    }
  },[data])

  return (
    <div className="admin-container">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main */}
        {
          isLoading ? <TableSkeleton />
          : 
          <>
            <main>
              <Table<DataType>
                  columns = {columns}
                  data = {rows}
                  containerClassname = "dashboard-product-box"
                  heading = "Transaction"
                  showPagination = {rows.length > 6}
              /> 
            </main>
          </>
        }
    </div>
  )
}

export default Transactions
