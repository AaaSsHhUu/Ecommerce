import { FaRegBell, FaSearch } from "react-icons/fa"
import { AdminSidebar } from "../../components"
import userImg from "../../assets/images/user.png";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

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

        <section className="widget-container">
          <Widget percent={40} amount={true} value={340000} heading="Revenue" color="rgb(0,115,255)" />

          <Widget percent={-14} value={400} heading="Users" color="rgb(0,198,202)" />
          
          <Widget percent={80} value={30000} heading="Transactions" color="rgb(255,196,0)" />
          
          <Widget percent={30} value={1000} heading="Products" color="rgb(75,0,255)" />
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

export default Dashboard
