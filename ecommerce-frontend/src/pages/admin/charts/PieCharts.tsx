import { AdminSidebar, DoughnutChart, PieChart } from "../../../components"
import {categories} from "../../../assets/data.json";
import { useState } from "react";

const PieCharts = () => {

  const [isPhoneActive, setIsPhoneActive] = useState<boolean>(window.innerWidth < 500 )

  return (
    <>
      <div className="admin-container">
        <AdminSidebar />
        <main className="chart-container">
          <h1>Pie & Doughnut {isPhoneActive && <br />} Charts</h1>

          <section>
            <div>
              <PieChart 
                labels={["Processing", "Shipped", "Delivered"]} data={[12, 9, 13]} 
                backgroundColor={["hsl(110,80%,80%)", "hsl(110,80%,50%)", "hsl(110,40%,50%)"]} 
                offset={[0, 0, 50]} />
            </div>
            <h2>Order Fulfillment Ratio</h2>
          </section>

          <section>
            <div>
              <DoughnutChart 
                labels={categories.map(i => i.heading)} 
                data={categories.map(i => i.value)} 
                legends={false}
                backgroundColor={categories.map(i => `hsl(${i.value * 4},${i.value}%,50%)`)} 
                offset={[0, 0, 0, 80]}
                cutout={isPhoneActive ? 70 : 110}
              />
            </div>
            <h2>Product Category Ratio</h2>
          </section>
          
          <section>
            <div>
              <DoughnutChart 
                labels={["In Stock","Out of Stock"]} 
                data={[30,10]} 
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
                  "Production Cost",
                  "Net Margin"
                ]} 
                data={[32,18,5,20,25]} 
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
                data={[30, 250, 100]} 
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
                labels={["Admin","Customer"]} 
                data={[2,100]} 
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
      </div>
    </>
  )
}

export default PieCharts;
