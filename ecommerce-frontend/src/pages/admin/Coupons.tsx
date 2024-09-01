import { useSelector } from "react-redux";
import { AdminSidebar, TableSkeleton } from "../../components"
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";
import Table from "../../components/admin/Table";
import { Column } from "react-table";
import { ReactElement, useEffect, useState } from "react";
import { useAllCouponsQuery, useDeleteCouponMutation, useNewCouponMutation } from "../../redux/api/couponApi";
import { CustomError } from "../../types/api-types";
import { FaCross, FaPlus, FaTrash } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { Coupon } from "../../types/types";
import { responseToast } from "../../utils/features";
import { useNavigate } from "react-router-dom";

interface Datatype{
  coupon : string;
  amount : number;
  action : ReactElement;
}

const columns : Column<Datatype>[] = [
  {
    Header : "Coupon",
    accessor : "coupon"
  },
  {
    Header : "Amount",
    accessor : "amount"
  },
  {
    Header : "Action",
    accessor : "action"
  },
]

const Coupons = () => {

  const {user} = useSelector((state : RootState) => state.userReducer);
  
  const {data, isLoading, isError, error} = useAllCouponsQuery(user?._id!);

  const [rows, setRows] = useState<Datatype[]>([]);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [couponInfo, setCouponInfo] = useState<Coupon>({
      _id : "",
      coupon : "",
      amount : 0
  })

  const navigate = useNavigate();
  useEffect(() => {
    console.log("data : ", data);
    
    if(data){
        setRows(data.coupons.map((c) => ({
            coupon : c.coupon,
            amount : c.amount,
            action : <button onClick={() => deleteCouponHandler(c._id)} ><FaTrash /></button>
        })))
    }
  },[data])

  const [newCoupon] = useNewCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  if(isError){
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const createCouponHandler = async (id : string) => {
      const res = await newCoupon({couponInfo, adminId : id});
      console.log("res : ", res);
      responseToast(res,navigate,"/admin/coupons");
  }

  const deleteCouponHandler = async (id : string) => {
      const res = await deleteCoupon({couponId : id, adminId : user?._id!})

      responseToast(res,navigate,"/admin/coupons")
  }

  return (
    <div className="admin-container">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main */}
        <main className="coupon">
            <button className="create-product-btn" onClick={() => setOpenDialog(true)}> {/* already styled button */}
              <FaPlus />
            </button>

            <dialog className="coupon-dialog" open={openDialog} style={{display : openDialog ? "flex" : "none"}} >
                  <div className="dialog-content">
                      <button className="dialog-close-btn"><IoIosCloseCircle 
                      onClick={() => setOpenDialog(false)}
                      /></button>
                      <input type="text" 
                        placeholder="Enter Coupon code" 
                        value={couponInfo.coupon}
                        onChange={(e) => setCouponInfo({...couponInfo, coupon : e.target.value})}
                      />
                      <input type="number" 
                        placeholder="Enter amount" 
                        value={couponInfo.amount}
                        onChange={(e) => setCouponInfo({...couponInfo, amount : Number(e.target.value)})}
                      />
                      <button onClick={() => createCouponHandler(user?._id!)}>create</button>
                  </div>
            </dialog>
            {isLoading ? <TableSkeleton />
              :
              <Table 
                columns={columns}
                data={rows}
                containerClassname="dashboard-product-box"
                heading="Coupons"
                showPagination = {rows.length > 6}
              />
            }
        </main>
    </div>
  )
}

export default Coupons