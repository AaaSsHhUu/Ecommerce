import { AdminSidebar, DoughnutChart, Loader, PieChart } from "../../../components"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { usePieQuery } from "../../../redux/api/dashboardApi";
import { CustomError } from "../../../types/api-types-";
import toast from "react-hot-toast";

const PieCharts = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = usePieQuery(user?._id!);

  const [isPhoneActive, setIsPhoneActive] = useState<boolean>(window.innerWidth < 500)

  const resizeHandler = () => {
    setIsPhoneActive(window.innerWidth < 500)
  }
  useEffect(() => {
    window.addEventListener("resize", resizeHandler)

    return () => {
      window.removeEventListener("resize", resizeHandler)
    }
  }, [])

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const order = data?.charts.orderFullfillment!;
  const categories = data?.charts.productCategoriesInfo!;
  const stock = data?.charts.stockAvailability!;
  const revenue = data?.charts.revenueDistribution!;
  const userAge = data?.charts.usersAgeGroups!;
  const adminCustomer = data?.charts.adminAndCustomer!;


  console.log("user age : ", userAge);
  
  return (
    <>
      <div className="admin-container">
        <AdminSidebar />

        {isLoading ? <Loader />
          :
          <main className="chart-container">
            <h1>Pie & Doughnut {isPhoneActive && <br />} Charts</h1>

            <section>
              <div>
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]} 
                  data={[order?.delivered, order?.processing, order?.shipped]}
                  backgroundColor={["hsl(110,80%,80%)", "hsl(110,80%,50%)", "hsl(110,40%,50%)"]}
                  offset={[0, 0, 50]} />
              </div>
              <h2>Order Fulfillment Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={categories.map(i => Object.keys(i)[0])}
                  data={categories.map(i => Object.values(i)[0])}
                  legends={false}
                  backgroundColor={
                    categories.map(i => 
                      `hsl(${Object.values(i)[0] * Math.random() * 4},
                        ${Object.values(i)[0]}%,
                        50%
                      )`
                    )
                  }
                  offset={[0, 0, 0, 80]}
                  cutout={isPhoneActive ? 70 : 110}
                />
              </div>
              <h2>Product Category Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["In Stock", "Out of Stock"]}
                  data={[stock.inStock, stock.outOfStock]}
                  legends={false}
                  backgroundColor={[
                    "hsl(269,80%,40%)",
                    "rgb(53, 162, 255)"
                  ]}
                  offset={[0, 50]}
                  cutout={isPhoneActive ? 70 : 130}
                />
              </div>
              <h2>Stock Availability</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Shipping Charges",
                    "Net Margin"
                  ]}
                  data={[revenue.marketingCost, revenue.discount, revenue.burnt, revenue.shippingCharges, revenue.netMargin]}
                  legends={false}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(169,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53, 162, 255)"
                  ]}
                  offset={[20, 30, 20, 30, 80]}
                />
              </div>
              <h2>Revenue Distribution</h2>
            </section>

            <section>
              <div>
                <PieChart
                  labels={[
                    "Teenager (Below 20)",
                    "Adult (20-40)",
                    "Older (Above 40)"
                  ]}
                  data={[userAge.teen, userAge.adult, userAge.old]}
                  backgroundColor={[
                    "hsl(210,80%,80%)",
                    "hsl(210,80%,50%)",
                    "hsl(210,40%,50%)"
                  ]}
                  offset={[0, 0, 50]} />
              </div>
              <h2>Users Age Group</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["Admin", "Customer"]}
                  data={[adminCustomer.admin, adminCustomer.customer]}
                  legends={true}
                  backgroundColor={[
                    "hsl(335,100%,40%)",
                    "hsl(44, 98%, 50%)"
                  ]}
                  offset={[0, 80]}
                />
              </div>
            </section>
          </main>
        }
      </div>
    </>
  )
}

export default PieCharts;
