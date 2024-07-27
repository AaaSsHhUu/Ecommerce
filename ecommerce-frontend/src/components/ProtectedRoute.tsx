import { ReactElement } from "react"
import { Navigate, Outlet } from "react-router-dom";

interface Props{
    children ?: ReactElement;
    isAuthenticated : boolean;
    admin ?: boolean;
    adminOnly ?: boolean;
    redirect ?: string;
}

const ProtectedRoute = ({
    children,
    isAuthenticated,
    admin,
    adminOnly,
    redirect = "/"
} : Props) => {
    if(!isAuthenticated){
        <Navigate to={redirect} />
    } 
    
    if(adminOnly && !admin){
        <Navigate to={redirect} />
    } 

    return children ? children : <Outlet />;
}

export default ProtectedRoute
