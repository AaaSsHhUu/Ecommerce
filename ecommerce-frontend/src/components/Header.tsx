import { useState } from "react"
import { FaHome, FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa"
import { IoLogoBitbucket } from "react-icons/io"
import { Link } from "react-router-dom"

const Header = () => {
    const users = { _id: "", role: "admin" }

    const [isOpen, setIsOpen] = useState(false);

    const logoutHandler = () => {
        setIsOpen(false);
        // log out logic
    }
    return (
        <nav className="header">
            <div className="logo">
                <IoLogoBitbucket />
                <Link to={"/"}><h1>BuyBucket</h1></Link>
            </div>
            <div className="nav-links">
                <Link to={"/"} onClick={() => setIsOpen(false)}>
                    <FaHome size={"1.3rem"} />Home
                </Link>
                <Link to={"/search"} onClick={() => setIsOpen(false)}>
                    <FaSearch />Search
                </Link>
                <Link to={"/cart"} onClick={() => setIsOpen(false)}>
                    <FaShoppingBag />Cart
                </Link>
                {
                    users?._id ?  // means user is logged in
                        (
                            <>
                                <button onClick={() => setIsOpen(prev => !prev)}>
                                    <FaUserCircle size={"1.3rem"}/>
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
                                            <FaSignOutAlt />Logout
                                        </button>
                                    </div>
                                </dialog>
                            </>
                        )
                        :
                        (
                            <Link to={"/login"}>
                                <FaSignInAlt />Login
                            </Link>
                        )
                }
            </div>
        </nav>
    )
}

export default Header
