import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import { RootState } from "../redux/store";
import { useMyOrderQuery } from "../redux/api/orderApi";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { TableSkeleton } from "../components";
import Table from "../components/admin/Table";

type Datatype = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
}

const column: Column<Datatype>[] = [
    {
        Header: "ID",
        accessor: "_id"
    },
    {
        Header: "Amount",
        accessor: "amount"
    },
    {
        Header: "Quantity",
        accessor: "quantity"
    },
    {
        Header: "Discount",
        accessor: "discount"
    },
    {
        Header: "Status",
        accessor: "status"
    },
    {
        Header: "Action",
        accessor: "action"
    }
];

const Orders = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);

    const { isLoading, data, isError, error } = useMyOrderQuery(user?._id!);
    
    const [rows, setRows] = useState<Datatype[]>([]);

    if(isError){
        const err = error as CustomError;
        toast.error(err.data.message);
    }

    useEffect(() => {
        if(data){
            setRows(data.orders.map(i => ({
                _id : i._id,
                amount : i.total,
                discount : i.discount,
                quantity : i.orderItems.length,
                status : <span className={ i.status === "Processing" ? "red" : i.status === "Shipped" ? "green" : "purple" }>
                        {i.status}
                    </span>,
                action : <Link to={`/admin/transaction/${i._id}`} >Manage</Link>
            })))
        }
    },[data])

    return (
        <div className="container">
            <h2>My Orders</h2>

            {isLoading ? <TableSkeleton />
              :
              <Table 
                columns={column}
                data={rows}
                containerClassname="dashboard-product-box"
                heading="Orders"
                showPagination = {rows.length > 6}
              />
            }
        </div>
    )
}

export default Orders