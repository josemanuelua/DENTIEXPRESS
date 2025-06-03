import React from "react";
import { Navigate } from "react-router-dom";
import { Role } from "../services/IAuthService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface AdminRoutesProps{
    children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRoutesProps> = ({children}) => {
    
    const user = useSelector((state: RootState) => state.auth.userid);
    console.log("desde Admn route, el usuario: " + user);
    const roles = useSelector((state: RootState) => state.auth.roles);
    if(!user || !roles || !roles.includes(Role.ADMIN)){
        return <Navigate to="/" replace />;
    }
    return <>{children}</>
};

export default AdminRoute;