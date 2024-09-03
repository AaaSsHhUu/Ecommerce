import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import { AdminSidebar, TableSkeleton } from "../../components";
import Table from "../../components/admin/Table";
import { useAllUserQuery, useDeleteUserMutation } from "../../redux/api/userApi";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { responseToast } from "../../utils/features";

interface DataType{
  avatar : ReactElement;
  name : string;
  email : string;
  gender : string;
  role : string;
  action : ReactElement;
}


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

const Customer = () => {

  const {user} = useSelector((state : RootState) => state.userReducer);

  const {data, isLoading, isError, error} = useAllUserQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  const [deleteUser] = useDeleteUserMutation();

  const deleteUserHandler = async (userId : string) => {
    const res = await deleteUser({
      userId,
      adminId : user?._id!
    })
    responseToast(res,null,"");
  }

  useEffect(() => {
    if(data){
      setRows(data.users.map((i) => ({
          avatar : <img src={i.photo} style={{borderRadius : "50%"}} alt={i.name} />,
          name : i.name,
          email : i.email,
          gender : i.gender,
          role : i.role,
          action : <button onClick={() => deleteUserHandler(i._id)}>{<FaTrash />}</button>

      })))
    }
  },[data])

  if(isError){
    const err = error as CustomError;
    toast.error(err.data.message);
  }


  return (
    <div className="admin-container">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main */}
        <main>
            { isLoading ? <TableSkeleton /> 
              : 
              <Table<DataType> 
                columns = {columns}
                data={rows}
                containerClassname="dashboard-product-box" // same styling -> same classname
                heading="Customers"
                showPagination = {rows.length > 6}
              />
            }
        </main>
    </div>
  )
}

export default Customer
