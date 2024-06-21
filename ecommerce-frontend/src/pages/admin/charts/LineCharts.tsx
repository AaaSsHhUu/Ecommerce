import { AdminSidebar, LineChart } from "../../../components"


const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]
const LineCharts = () => {
  return (
    <>
        <div className="admin-container">
          <AdminSidebar />
          <main className="chart-container">
              <h1>Line Charts</h1>

                <section>
                  <LineChart
                    label="Users"
                    backgroundColor="rgba(53,162,255,0.5)"
                    borderColor="rgb(53,162,255)"
                    data={[145,235,332,494,332,421,545,445,556,635,765,876,911,1034]}
                    labels={months}
                  />
                  <h2>Top Selling Products & Top Customers</h2>
                </section>
                
                <section>
                  <LineChart
                    label="Products"
                    backgroundColor="hsla(269,80%,40%,0.4)"
                    borderColor="hsla(269,80%,40%)"
                    data={[40,60,54,70,65,80,98,104,112,115]}
                    labels={months}
                  />
                  <h2>Total Products (SKU)</h2>
                </section>

                <section>
                  <LineChart
                    label="Revenue"
                    backgroundColor="hsla(129,80%,40%,0.4)"
                    borderColor="hsl(129,80%,40%)"
                    data={[14500,23500,33200,49400,33200,42100,54500,44500,55600,63500,76500,87600,91100,103400]}
                    labels={months}
                  />
                  <h2>Total Revenue</h2>
                </section>

                <section>
                  <LineChart
                    label="Discount"
                    backgroundColor="hsla(29,80%,40%,0.4)"
                    borderColor="hsl(29,80%,40%)"
                    data={[9000,1200,3000,4300,4500,2134,3423,6786,3563,7956,2045]}
                    labels={months}
                  />
                  <h2>Discount Alloted</h2>
                </section>

          </main>
        </div>
    </>
  )
}

export default LineCharts
