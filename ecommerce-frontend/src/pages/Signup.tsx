import { MouseEvent, useState } from "react"
import {SignupInput} from "../../../ecommerce-backend/src/types/schema";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
    const [signupInfo, setSignupInfo] = useState<SignupInput>({
        name : "",
        email : "",
        password : "",
        gender : "male",
        dob : new Date()
    })

    const[showPassword, setShowPassword] = useState(false);

    const handleShowPassword = (e : MouseEvent ) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }
  return (
    <div className="signup-container">
      <div className="signup-card">
          {/* banner */}
          <div className="signup-banner">
              <h1>Signup</h1>
          </div>
          {/* form */}
          <div className="signup-form">
            <form>
                {/* Name */}
                <div className="signup-input">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter your name" />
                </div>
                {/* Email */}
                <div className="signup-input">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" />
                </div>
                {/* Password */}
                <div className="signup-input">
                    <label htmlFor="password">Password</label>
                    <div className="password-input" tabIndex={0}>
                      <input type={showPassword ? "text" : "password"} id="password" placeholder="Enter your password" />
                      <button onClick={handleShowPassword}>
                        {showPassword ? <FaEyeSlash/> : <FaEye />}
                      </button>
                    </div>
                </div>
                <div className="signup-pseudo-input">
                    {/* Gender */}
                    <div className="gender-input">
                      <label htmlFor="gender">Gender</label>
                      <select name="gender">
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                      </select>
                    </div>
                    {/* DOB */}
                    <div className="dob-input">
                      <label htmlFor="dob">DOB</label>
                      <input type="date" id="dob"/>
                    </div>
                </div>

                <button className="signup-btn" type="submit">Signup</button>
            </form>
          </div>
      </div>
    </div>
  )
}

export default Signup
