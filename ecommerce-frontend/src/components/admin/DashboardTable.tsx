import { Column } from "react-table";
import Table from "./Table";

interface DataType{
    _id : string;
    quantity : number;
    discount : number;
    amount : number;
    status : string;
}

const columns :Column<DataType>[] = [
    {
        Header : "ID",
        accessor : "_id"
    },
    {
        Header : "Quantity",
        accessor : "quantity"
    },
    {
        Header : "Discount",
        accessor : "discount"
    },
    {
        Header : "Amount",
        accessor : "amount"
    },
    {
        Header : "Status",
        accessor : "status"
    },
]
const DashboardTable = ({data = []} : {data : DataType[]}) => {
    return <Table<DataType> 
            columns={columns}
            data={data}
            containerClassname="transaction-box"
            heading="Top Transactions"  
            showPagination = {false}  
        />;
    
}

export default DashboardTable;
