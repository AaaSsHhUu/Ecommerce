import { Column } from "react-table"
import { AdminSidebar } from "../../components"
import { ReactElement, useCallback, useState } from "react";
import TableHOC from "../../components/admin/TableHOC";
import { FaTrash } from "react-icons/fa";

const Customer = () => {

  interface DataType{
    avatar : ReactElement;
    name : string;
    email : string;
    gender : string;
    role : string;
    action : ReactElement;
  }

  const img1 = "https://randomuser.me/api/portraits/med/men/75.jpg";
  const img2 = "https://randomuser.me/api/portraits/med/women/20.jpg"
  const arr : DataType[] = [
    {
      avatar : <img src={img1} style={{borderRadius : "50%"}} alt="user img"/>,
      name : "John Doe",
      email : "john@gmail.com",
      gender : "Male",
      role : "user",
      action : <button><FaTrash color="red" /></button>
    },
    {
      avatar : <img src={img2} style={{borderRadius : "50%"}} alt="user img"/>,
      name : "Emily Stark",
      email : "emily@gmail.com",
      gender : "Female",
      role : "user",
      action : <button><FaTrash color="red" /></button>
    },
  ];

  const [data] = useState<DataType[]>(arr);

  const columns : Column<DataType>[] = [
    {
      Header : "Avatar",
      accessor : "avatar"
    },
    {
      Header : "Name",
      accessor : "name"
    },
    {
      Header : "Email",
      accessor : "email"
    },
    {
      Header : "Gender",
      accessor : "gender"
    },
    {
      Header : "Role",
      accessor : "role"
    },
    {
      Header : "Action",
      accessor : "action"
    },
  ];

  const Table = TableHOC<DataType>(
    columns,
    data,
    "dashboard-product-box", // same styling -> same classname
    "Customers",
    data.length > 6
  )();

  return (
    <div className="admin-container">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main */}
        <main>
          {Table} 
        </main>
    </div>
  )
}

export default Customer
