import { ReactElement, useState } from "react";
import { AdminSidebar } from "../../components"
import { Column } from "react-table";
import Table from "../../components/admin/Table";

const Transactions = () => {
  interface DataType{
    user : string;
    amount : number;
    discount : number;
    quantity : number;
    status : ReactElement;
    action : ReactElement;
  }

  const [rows, setRows] = useState<DataType[]>([]);

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

  return (
    <div className="admin-container">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main */}
        <main>
            <Table<DataType>
                columns = {columns}
                data = {rows}
                containerClassname = "dashboard-product-box"
                heading = "Transaction"
                showPagination = {rows.length > 6}
            /> 
        </main>
    </div>
  )
}

export default Transactions
