import { ReactElement, useState, useCallback } from "react";
import { AdminSidebar } from "../../components"
import { Column } from "react-table";
import TableHOC from "../../components/TableHOC";
import { Link } from "react-router-dom";

const Transactions = () => {
  interface DataType{
    user : string;
    amount : number;
    discount : number;
    quantity : number;
    status : ReactElement;
    action : ReactElement;
  }

  const arr : DataType[] = [
    {
      user : "Demo",
      amount : 4400,
      discount : 400,
      quantity : 3,
      status : <span className="red">Processing</span>,
      action : <Link to="/admin/transactions/snunsxa">Manage</Link>
    }
  ];

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
    <div className="admin-container">
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
