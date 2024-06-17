import { ReactElement, useState, useCallback } from "react";
import { AdminSidebar } from "../../components"
import { Column } from "react-table";
import TableHOC from "../../components/TableHOC";

const Transactions = () => {
  interface DataType{
    user : string;
    amount : number;
    discount : number;
    quantity : number;
    status : string;
    action : ReactElement;
  }

  const arr : DataType[] = [];

  const [data] = useState<DataType[]>(arr);

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

  const Table = useCallback(
    TableHOC(
      columns,
      data,
      "dashboard-product-box", // same style -> same name
      "Transactions",
      data.length > 6
    ),[])

  return (
    <div className="adminContainer">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main */}
        <main>
          {Table()}  
        </main>
    </div>
  )
}

export default Transactions
