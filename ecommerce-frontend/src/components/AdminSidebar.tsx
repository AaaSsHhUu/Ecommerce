import { IconType } from "react-icons";
import { RiDashboardFill, RiShoppingBag3Fill, RiFileTextFill, RiMoneyRupeeCircleFill } from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";

const AdminSidebar = () => {

  const location = useLocation();

  return (
    <aside>
        <h2>Logo</h2>

        <div>
            <h5>Dashboard</h5>
            <ul>
              {/* Dashboard */}
                <Li text="Dashboard" url="/admin/dashboard" Icon={RiDashboardFill} location={location} />
              {/* Products */}
                <Li text="Products" url="/admin/products" Icon={RiShoppingBag3Fill} location={location} />
              {/* Customers */}
                <Li text="Customers" url="/admin/customers" Icon={RiFileTextFill} location={location} />
              {/* Transactions */}
                <Li text="Transactions" url="/admin/transactions" Icon={RiMoneyRupeeCircleFill} location={location} />
            </ul>
        </div>
    </aside>
  )
}

interface LiProps {
    text : string;
    url : string;
    Icon : IconType;
    location : Location;
}
const Li = ({text,url,Icon,location} : LiProps) => {
  return (
    <li style={{backgroundColor : location.pathname.includes(text.toLowerCase()) ? "rgba(0,115,255,0.1)" : "white"}}>
        <Link to={url} style={{color : location.pathname.includes(text.toLowerCase()) ? "rgb(0,115,255)" : "black"}}>
            <Icon />
            {text}
        </Link>
    </li>
  )
}

export default AdminSidebar
