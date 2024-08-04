import { ReactElement } from "react"
import { Outlet, Navigate } from "react-router-dom";

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

    if(!isAuthenticated) return <Navigate to={"/"} />;
    
    if(adminOnly && !admin) return <Navigate to={redirect} />

    return children ? children : <Outlet />;
}

export default ProtectedRoute
