import { useState, MouseEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { SignupInfo } from "../types/types";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    photo: ""
  })
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }
  return (
    <div className="signup-container">
      <div className="form-card">
        <h1>Signup</h1>
        <form className="signup-form">
          {/* Name */}
          <input type="text" id="name" placeholder="Enter your name" />

          {/* Email */}
          <input type="email" id="email" placeholder="Enter your email" />

          {/* Password */}
          <div className="password-input" tabIndex={0}>
            <input type={showPassword ? "text" : "password"} id="password" placeholder="Enter your password" />
            <button onClick={handleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Photo */}
          <input type="file" placeholder="Enter photo for profile" />

          <div className="pseudo-inputs">
            {/* Gender */}
            <select name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {/* DOB */}
            <input type="date" id="dob" placeholder="Enter DOB" />
          </div>

          <button className="signup-btn" type="submit">Signup</button>
          <Link to={"/login"}>Already have an account ? Login</Link>

          <div className="firebase-options">
            <button>
              <FcGoogle />
              <p>Signup with Google</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
