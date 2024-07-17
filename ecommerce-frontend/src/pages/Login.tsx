import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ChangeEvent, useState, MouseEvent } from "react";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import { LoginInfo } from "../types/types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [loginInfo, setLoginInfo] = useState<LoginInfo>({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState<boolean>(false);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    }

    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const user = await signInWithPopup(auth, provider)
            console.log("user : ", user);

        } catch (error) {
            toast.error("Login Failed, Try Again")
        }
    }

  const handleShowPassword = (e: MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

    return (
        <div className="login-container">
            <div className="form-card">
                <h1>Login</h1>
                <form className="login-form">
                    {/* Email */}
                    <input type="email" id="email" placeholder="Enter your email" />

                    {/* Password */}
                    <div className="password-input" tabIndex={0}>
                        <input type={showPassword ? "text" : "password"} id="password" placeholder="Enter your password" />
                        <button onClick={handleShowPassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button className="login-btn" type="submit">Login</button>
                    <Link to={"/signup"}>Do not have an account ? Signup</Link>

                    <div className="firebase-options">
                        <button>
                            <FcGoogle />
                            <p>Login with Google</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
