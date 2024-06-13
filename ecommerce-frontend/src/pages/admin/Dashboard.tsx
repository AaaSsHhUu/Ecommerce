import { FaRegBell, FaSearch } from "react-icons/fa"
import { AdminSidebar, BarChart } from "../../components"
import userImg from "../../assets/images/user.png";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import data from "../../assets/data.json";

const Dashboard = () => {

  return (
    <div className="adminContainer">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <main className="dashboard">
        <div className="bar">
          <FaSearch />
          <input type="text" placeholder="Search for data, users, docs" />
          <FaRegBell size={20} />
          <img src={userImg} alt="user" />
        </div>

        {/* Widget Container */}
        <section className="widget-container">
          <Widget percent={40} amount={true} value={340000} heading="Revenue" color="rgb(0,115,255)" />

          <Widget percent={-14} value={400} heading="Users" color="rgb(0,198,202)" />
          
          <Widget percent={80} value={30000} heading="Transactions" color="rgb(255,196,0)" />
          
          <Widget percent={30} value={1000} heading="Products" color="rgb(75,0,255)" />
        </section>

        {/* Graph Container */}
        <section className="graph-container">
            <div className="revenue-chart">
              <h2>Revenue & Transactions</h2>
              <BarChart 
                data1={[300,144,433,655,237,655,490]}
                data2={[200,444,575,755,437,785,690]}
                title1="Revenue"
                title2="Transaction"
                bgColor1="rgb(0,115,255)"
                bgColor2="rgb(53,162,235,0.8)"
               />
            </div>

            <div className="dashboard-categories">
                <h2>Inventories</h2>
                {
                  data.categories.map((item) => (
                      <CategoryItem 
                        heading={item.heading}
                        value={item.value}
                        color={`hsl(${item.value * 4},${item.value}%,60%)`}
                        key={item.heading}
                      />
                  ))
                }
            </div>
        </section>
      </main>
    </div>
  )
}

interface widgetProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const Widget = ({ heading, value, percent, color, amount }: widgetProps) => {
  return (
    <article className="widget">
      <div className="widget-info">
        <p>{heading}</p>
        <h4>{amount ? `$${value}` : value}</h4>
        {
          percent > 0 ?
            <span className="green">
              <HiTrendingUp /> +{percent}%{" "}
            </span>
            :
            <span className="red">
              <HiTrendingDown /> {percent}%{" "}
            </span>
        }
      </div>

      <div className="widget-circle"
        style={{
          background : `conic-gradient(${color} ${(Math.abs(percent)/100) * 360}deg, white 0 )`
        }}>
        <span style={{color : color}}>{percent}%</span>
      </div>
    </article>
  )
}

interface CategoryItemProps{
  color : string;
  value : number;
  heading: string;
}

const CategoryItem = ({color,value,heading} : CategoryItemProps) => {
  return (
    <div className="category-item">
      <h5>{heading}</h5>
      <div>
        <div style={{
          backgroundColor : color,
          width : `${value}%`
        }}></div>
      </div>
      <span>{value}%</span>
    </div>
  )
}

export default Dashboard
