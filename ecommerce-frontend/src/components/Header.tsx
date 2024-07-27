import { useEffect, useState } from "react";
import { FaHome, FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { IoLogoBitbucket } from "react-icons/io";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { RiMenu3Fill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

interface PropsType{
    user : User | null;
}

const Header = ({user} : PropsType) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [isPhoneActive, setIsPhoneActive] = useState<boolean>(window.innerWidth < 1024);

    const logoutHandler = async () => {
        try {
            await signOut(auth);
            toast.success("Signed Out Successfully");
        } catch (error) {
            toast.error("Sign out Failed");
        }
    }

    const resizeHandler = () => {
        setIsPhoneActive(window.innerWidth < 1024);
    }
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        }
    },[])

    return (
        <div className="header-container">
            <nav className="header">
                <Link to={"/"} className="logo">
                    <IoLogoBitbucket />
                    <h1>BuyBucket</h1>
                </Link>

                {isPhoneActive && <button className="nav-btn" onClick={() => setShowMenu(prev => !prev)} >
                    {showMenu ?   <AiOutlineClose /> : <RiMenu3Fill />}
                </button>}

                <div className="nav-links" 
                    style={{display : isPhoneActive ? 
                        (showMenu ? "flex" : "none") : ""}}
                >
                    <Link to={"/"} onClick={() => setIsDialogOpen(false)}>
                        <FaHome size={"1.3rem"} />Home
                    </Link>
                    <Link 
                      to={"/search"} 
                      onClick={() => setIsDialogOpen(false)}
                    >
                        <FaSearch />Search
                    </Link>
                    <Link to={"/cart"} onClick={() => setIsDialogOpen(false)}>
                        <FaShoppingBag />Cart
                    </Link>
                    {
                        user?._id ?  // means user is logged in
                            (
                                <div className="profile">
                                    <button onClick={() => setIsDialogOpen(prev => !prev)}>
                                        <FaUserCircle size={"1.3rem"} />Profile
                                    </button>
                                    <dialog open={isDialogOpen} style={{ display: isDialogOpen ? "block" : "none" }}>
                                        <div>
                                            {
                                                user?.role === "admin" && (
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
