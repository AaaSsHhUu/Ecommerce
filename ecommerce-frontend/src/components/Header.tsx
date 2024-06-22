import { useState } from "react"
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"

const Header = () => {
    const users = { _id : "djd", role : "admin" }

    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="header">
        <Link to={"/"}>Home</Link>
        <Link to={"/search"}>
            <FaSearch />
        </Link>
        <Link to={"/cart"}>
            <FaShoppingBag />
        </Link>
        {
            users?._id ?  // means user is logged in
            (
                <>
                    <button onClick={() => setIsOpen(prev => !prev)}>
                        <FaUser />
                    </button>
                    <dialog open={isOpen}>
                        <div>
                            {
                                users?.role === "admin" && (
                                    <Link to={"/admin/dashboard"}>Admin</Link>
                                )
                            }

                            <Link to={"/orders"}>Orders</Link>
                            <button>
                                <FaSignOutAlt />
                            </button>
                        </div>
                    </dialog>
                </>
            )
             : 
            (
                <Link to={"/login"}>
                    <FaSignInAlt />
                </Link>
            )
        }
    </nav>
  )
}

export default Header
