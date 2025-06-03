import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ProtectedRoutesProps{
    children: React.ReactNode;
}

const ProtectedRoute:React.FC<ProtectedRoutesProps> = ({children}) =>{
    const user = useSelector((state:RootState)=>state.auth.userid);
    console.log("userid vale desde Protected: " + user);
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>
};

export default ProtectedRoute;