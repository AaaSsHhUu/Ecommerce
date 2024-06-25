import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface LoginInfoProps {
    email: string;
    password: string;
}

const Login = () => {
    const [loginInfo, setLoginInfo] = useState<LoginInfoProps>({
        email: "",
        password: ""
    })
    const [showPassword,setShowPassword] = useState<boolean>(false);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    }


    return (
        <>
            <div className="login">
                <h1>Login</h1>
                <form>
                    {/* Email */}
                    <div>
                        <TextField id="outlined-basic"
                            name="email"
                            label="Email"
                            variant="outlined"
                            value={loginInfo.email}
                            sx={{ width: "100%" }}
                            type="text"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Password */}
                    <div>
                        <TextField id="outlined-basic"
                            name="password"
                            label="password"
                            variant="outlined"
                            value={loginInfo.password}
                            sx={{ width: "100%" }}
                            type={showPassword ? "text" : "password"}
                            onChange={handleChange}
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(prev => !prev)}>
                            {!showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button type="submit" className="login-btn">Login</button>

                    <hr style={{width : "80%"}} />
                    <div className="login-links">
                        <div className="google-link">
                            <FcGoogle /> 
                            <p>Sign in using Google</p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
