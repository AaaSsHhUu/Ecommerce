import { useSelector } from "react-redux";
import { AdminSidebar, BarChart, Loader } from "../../../components";
import { RootState } from "../../../redux/store";
import { useBarQuery } from "../../../redux/api/dashboardApi";
import { CustomError } from "../../../types/api-types-";
import toast from "react-hot-toast";
import { getLastMonths } from "../../../utils/features";


const BarCharts = () => {

  const { user: adminUser } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useBarQuery(adminUser?._id!);

  const {lastSixMonths, lastTwelveMonths} = getLastMonths();

  const order = data?.charts.order;
  const product = data?.charts.product;
  const user = data?.charts.user;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <>
      <div className="admin-container">
        <AdminSidebar />
        {
          isLoading ? <Loader />
            :
            <main className="chart-container">
              <h1>Bar Charts</h1>
              <section>
                <BarChart
                  data1={product || []}
                  data2={user || []}
                  title1="Products"
                  title2="Users"
                  bgColor1="hsl(260,50%,30%)"
                  bgColor2="hsl(360,90%,90%)"
                  labels={lastSixMonths}
                />
                <h2>Top Selling Products & Top Customers</h2>
              </section>

              <section>
                <BarChart
                  data1={order || []}
                  data2={[]}
                  title1="Products"
                  title2=""
                  bgColor1="hsl(180,40%,50%)"
                  bgColor2=""
                  labels={lastTwelveMonths}
                  horizontal={true}
                />
                <h2>Orders Throughout the Year</h2>
              </section>
            </main>
        }
      </div>
    </>
  )
}

export default BarCharts
