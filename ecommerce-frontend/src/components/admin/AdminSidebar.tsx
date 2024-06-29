import { useState, useEffect } from "react";
import { IconType } from "react-icons";
import { FaChartBar, FaChartLine, FaChartPie } from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { RiDashboardFill, RiFileTextFill, RiMoneyRupeeCircleFill, RiShoppingBag3Fill } from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";

const AdminSidebar = () => {

  const location = useLocation(); // for accessing pathname

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isPhoneActive, setIsPhoneActive] = useState<boolean>(window.innerWidth < 1060 )

  const resizeHandler = () => {
      setIsPhoneActive(window.innerWidth < 1060);
  }

  useEffect(() => {
    window.addEventListener("resize",resizeHandler);

    return () => {
      window.removeEventListener("resize",resizeHandler)
    }
  },[])

  return (
    <>

      {isPhoneActive && <button id="hamburger" onClick={() => setShowModal(true)}>
        <HiMenuAlt4 />  
      </button>}

      <aside style={isPhoneActive ? {
        width : "20rem",
        height : "100vh",
        position : "fixed",
        left : showModal ? "0" : "-20rem",
        top : 0,
        transition : "all 0.5s"
      } : {}}>

        <div>
            <h5>Dashboard</h5>
            <ul>
              {/* Dashboard */}
                <Li text="Dashboard" url="/admin/dashboard" Icon={RiDashboardFill} location={location} />
              {/* Products */}
                <Li text="Product" url="/admin/product" Icon={RiShoppingBag3Fill} location={location} />
              {/* Customers */}
                <Li text="Customer" url="/admin/customer" Icon={RiFileTextFill} location={location} />
              {/* Transactions */}
                <Li text="Transaction" url="/admin/transaction" Icon={RiMoneyRupeeCircleFill} location={location} />
            </ul>
        </div>

        <div>
            <h5>Charts</h5>
            <ul>
              {/* Bar Chart */}
                <Li text="Bar" url="/admin/chart/bar" Icon={FaChartBar} location={location} />
              {/* Pie Chart */}
                <Li text="Pie" url="/admin/chart/pie" Icon={FaChartPie} location={location} />
              {/* Line Chart */}
                <Li text="Line" url="/admin/chart/line" Icon={FaChartLine} location={location} />
            </ul>
            {isPhoneActive && <button id="close-sidebar-btn" onClick={() => setShowModal(false)}>Close</button>}
        </div>
      </aside>
    </>
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
