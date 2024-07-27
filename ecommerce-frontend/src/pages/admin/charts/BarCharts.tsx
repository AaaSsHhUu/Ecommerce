import { AdminSidebar, BarChart } from "../../../components"

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
const BarCharts = () => {
  return (
    <>
      <div className="admin-container">
        <AdminSidebar />
        <main className="chart-container">
            <h1>Bar Charts</h1>
            <section>
              <BarChart 
                data1={[200,444,356,764,565,408,908]} 
                data2={[345,104,412,683,250,786,167]} 
                title1="Products" 
                title2="Users" 
                bgColor1="hsl(260,50%,30%)" 
                bgColor2="hsl(360,90%,90%)" 
              />
              <h2>Top Selling Products & Top Customers</h2>
            </section>

            <section>
              <BarChart 
                data1={[200,444,356,764,565,408,908,345,104,412,683,250]} 
                data2={[]} 
                title1="Products" 
                title2="" 
                bgColor1="hsl(180,40%,50%)" 
                bgColor2=""
                labels={months} 
                horizontal={true}
              />
              <h2>Orders Throughout the Year</h2>
            </section>
        </main>
      </div>
    </>
  )
}

export default BarCharts
