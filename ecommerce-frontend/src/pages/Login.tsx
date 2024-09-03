import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userApi";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { MessageResponse } from "../types/api-types";

const Login = () => {
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    
    const [login] = useLoginMutation();
    
    const dispatch = useDispatch();

    const firebaseLoginHandler = async (e: MouseEvent) => {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            const {user} = await signInWithPopup(auth, provider)
            // console.log("user : ", user);

            // console.log({
            //     name : user.displayName!,
            //     email : user.email!,
            //     photo : user.photoURL!,
            //     gender,
            //     role : "user",
            //     dob : date,
            //     _id : user.uid,
            // })
            
            const res = await login({
                name : user.displayName!,
                email : user.email!,
                photo : user.photoURL!,
                gender,
                role : "user",
                dob : date,
                _id : user.uid,
            })

            if("data" in res){
                toast.success(res.data?.message!);
                const data = await getUser(user.uid);
                dispatch(userExist(data.user));
            }else{
                const error = res.error as FetchBaseQueryError;
                const message = (error.data as MessageResponse).message;
                toast.error(message);
                dispatch(userNotExist());
            }
            // console.log("res : ", res);
            

        } catch (error) {
            toast.error("Login Failed, Try Again")
        }
    }

    return (
        <div className="login-container">
            <div className="form-card">
                <h1>Login</h1>
                <form className="login-form">
                    <div>
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dob">Date of birth</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <button className="login-btn" onClick={firebaseLoginHandler}>
                        <FcGoogle />
                        Login using Google
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
