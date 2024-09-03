import { useSelector } from "react-redux";
import { AdminSidebar, LineChart, Loader } from "../../../components"
import { getLastMonths } from "../../../utils/features"
import { RootState } from "../../../redux/store";
import { useLineQuery } from "../../../redux/api/dashboardApi";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";

const LineCharts = () => {

  const { user : adminUser } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useLineQuery(adminUser?._id!);

  const discount = data?.charts.discount || [];
  const product = data?.charts.product || [];
  const revenue = data?.charts.revenue || [];
  const user = data?.charts.user || [];

  const { lastTwelveMonths: months } = getLastMonths();

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
              <h1>Line Charts</h1>

              <section>
                <LineChart
                  label="Users"
                  backgroundColor="rgba(53,162,255,0.5)"
                  borderColor="rgb(53,162,255)"
                  data={user}
                  labels={months}
                />
                <h2>Top Selling Products & Top Customers</h2>
              </section>

              <section>
                <LineChart
                  label="Products"
                  backgroundColor="hsla(269,80%,40%,0.4)"
                  borderColor="hsla(269,80%,40%)"
                  data={product}
                  labels={months}
                />
                <h2>Total Products (SKU)</h2>
              </section>

              <section>
                <LineChart
                  label="Revenue"
                  backgroundColor="hsla(129,80%,40%,0.4)"
                  borderColor="hsl(129,80%,40%)"
                  data={revenue}
                  labels={months}
                />
                <h2>Total Revenue</h2>
              </section>

              <section>
                <LineChart
                  label="Discount"
                  backgroundColor="hsla(29,80%,40%,0.4)"
                  borderColor="hsl(29,80%,40%)"
                  data={discount}
                  labels={months}
                />
                <h2>Discount Alloted</h2>
              </section>

            </main>
        }
      </div>
    </>
  )
}

export default LineCharts
