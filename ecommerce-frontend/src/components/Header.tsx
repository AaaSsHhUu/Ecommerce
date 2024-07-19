import { useState } from "react";
import { FaHome, FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { IoLogoBitbucket } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
    const users = { _id: "", role: "admin" }

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const logoutHandler = () => {
        setIsDialogOpen(false);
    }

    return (
        <div className="header-container">
            <nav className="header">
                <Link to={"/"} className="logo">
                    <IoLogoBitbucket />
                    <h1>BuyBucket</h1>
                </Link>
                <div className="nav-links">
                    <Link to={"/"} onClick={() => setIsDialogOpen(false)}>
                        <FaHome size={"1.3rem"} />Home
                    </Link>
                    <Link to={"/search"} onClick={() => setIsDialogOpen(false)}>
                        <FaSearch />Search
                    </Link>
                    <Link to={"/cart"} onClick={() => setIsDialogOpen(false)}>
                        <FaShoppingBag />Cart
                    </Link>
                    {
                        users?._id ?  // means user is logged in
                            (
                                <div className="profile">
                                    <button onClick={() => setIsDialogOpen(prev => !prev)}>
                                        <FaUserCircle size={"1.3rem"} />Profile
                                    </button>
                                    <dialog open={isDialogOpen} style={{ display: isDialogOpen ? "block" : "none" }}>
                                        <div>
                                            {
                                                users?.role === "admin" && (
                                                    <Link to={"/admin/dashboard"} onClick={() => setIsDialogOpen(false)}>Admin</Link>
                                                )
                                            }

                                            <Link to={"/orders"}>Orders</Link>
                                            <button onClick={logoutHandler}>
                                                <FaSignOutAlt />Logout
                                            </button>
                                        </div>
                                    </dialog>
                                </div>
                            )
                            :
                            (
                                <>
                                    <Link to={"/login"}>
                                        <FaSignInAlt />Login
                                    </Link>
                                </>
                            )
                    }
                </div>
            </nav>
        </div>
    )
}

export default Header
