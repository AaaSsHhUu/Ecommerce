import { FaRegBell, FaSearch } from "react-icons/fa"
import { AdminSidebar, BarChart, DoughnutChart, DashboardTable, TableSkeleton, DashboardSkeleton } from "../../components"
import userImg from "../../assets/images/user.png";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { BiMaleFemale } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useStatsQuery } from "../../redux/api/dashboardApi";
import { CustomError } from "../../types/api-types-";
import toast from "react-hot-toast";

const Dashboard = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = useStatsQuery(user?._id!);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const stats = data?.stats;
  console.log("stats : ", stats);
  

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      {
        isLoading ? <DashboardSkeleton />
          :
          <>
            <main className="dashboard">
              <div className="bar">
                <FaSearch />
                <input type="text" placeholder="Search for data, users, docs" />
                <FaRegBell size={20} />
                <img src={userImg} alt="user" />
              </div>

              {/* Widget Container */}
              <section className="widget-container">
                <Widget percent={stats?.percentage.revenue || 0} amount={true} value={stats?.count.revenue!} heading="Revenue" color="rgb(0,115,255)" />

                <Widget percent={stats?.percentage.user || 0} value={stats?.count.user!} heading="Users" color="rgb(0,198,202)" />

                <Widget percent={stats?.percentage.order || 0} value={stats?.count.order!} heading="Transactions" color="rgb(255,196,0)" />

                <Widget percent={stats?.percentage.product || 0} value={stats?.count.product!} heading="Products" color="rgb(75,0,255)" />
              </section>

              {/* Graph Container */}
              <section className="graph-container">
                <div className="revenue-chart">
                  <h2>Revenue & Transactions</h2>
                  <BarChart
                    data1={stats?.chart.revenue!}
                    data2={stats?.chart.order!}
                    title1="Revenue"
                    title2="Transaction"
                    bgColor1="rgb(0,115,255)"
                    bgColor2="rgb(53,162,235,0.8)"
                  />
                </div>

                <div className="dashboard-categories">
                  <h2>Inventories</h2>
                  {
                    stats?.categoryCount.map((item) => {

                      const [heading, value] = Object.entries(item)[0];

                      return (
                        <CategoryItem
                          heading={heading}
                          value={value}
                          color={`hsl(${value * 4},${value}%,60%)`}
                          key={heading}
                        />
                      )
                    })
                  }
                </div>
              </section>

              {/* Transaction Container */}
              <div className="transaction-container">
                {/* Gender chart */}
                <div className="gender-chart">
                  <h2>Gender Ratio</h2>

                  <DoughnutChart
                    labels={["Female", "Male"]}
                    data={[stats?.userRatio.female || 0, stats?.userRatio.male || 0]}
                    backgroundColor={[
                      "hsl(340,82%,56%)",
                      "rgba(53,162,235,0.8)"
                    ]}
                    cutout={90}
                  />

                  <p><BiMaleFemale /></p>
                </div>

                {/* Table */}
                <DashboardTable data={stats?.latestTransaction!} />

              </div>


            </main>
          </>
      }
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
  // console.log("props : ", heading, value, percent, color, amount);
  
  return (
    <article className="widget">
      <div className="widget-info">
        <p>{heading}</p>
        <h4>{amount ? `₹ ${value}` : value}</h4>
        {
          percent > 0 ?
            <span className="green">
              <HiTrendingUp /> +{`${percent > 10000 ? 9999 : percent}%` }
            </span>
            :
            <span className="red">
              <HiTrendingDown /> {`${percent < -10000 ? -9999 : percent}%` }
            </span>
        }
      </div>

      <div className="widget-circle"
        style={{
          background: `conic-gradient(${color} ${(Math.abs(percent) / 100) * 360}deg, white 0 )`
        }}>
        <span style={{ color: color }}>
          {percent > 0 && `${percent > 10000 ? 9999 : percent}%` }
          {percent < 0 && `${percent < -10000 ? -9999 : percent}%`}
        </span>
      </div>
    </article>
  )
}

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => {
  return (
    <div className="category-item">
      <h5>{heading}</h5>
      <div>
        <div style={{
          backgroundColor: color,
          width: `${value}%`
        }}></div>
      </div>
      <span>{value}%</span>
    </div>
  )
}

export default Dashboard
