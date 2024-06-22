import { useState } from "react"
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"

const Header = () => {
    const users = { _id : "djd", role : "admin" }

    const [isOpen, setIsOpen] = useState(false);

    const logoutHandler = () => {
        setIsOpen(false);
        // log out logic
    }
  return (
    <nav className="header">
        <Link to={"/"} onClick={() => setIsOpen(false)}>Home</Link>
        <Link to={"/search"} onClick={() => setIsOpen(false)}>
            <FaSearch />
        </Link>
        <Link to={"/cart"} onClick={() => setIsOpen(false)}>
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
                                    <Link to={"/admin/dashboard"} onClick={() => setIsOpen(false)}>Admin</Link>
                                )
                            }

                            <Link to={"/orders"}>Orders</Link>
                            <button onClick={logoutHandler}>
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
