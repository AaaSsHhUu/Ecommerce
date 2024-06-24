import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface LoginInfoProps{
    email : string;
    password : string;
}

const Login = () => {
    const [loginInfo, setLoginInfo] = useState<LoginInfoProps>({
        email : "",
        password: ""
    })

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({...loginInfo, [e.target.name] : e.target.value}) 
    }
    return (

        <div className="login">
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
                        type="text"
                        onChange={handleChange}
                        required
                    />
                </div>
            </form>
        </div>
    )
}

export default Login
