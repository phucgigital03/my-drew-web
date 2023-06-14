import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

import configs from "~/configs";

function ProtectedRoute({ allowRoles }) {
    const accessToken = useSelector(state => state.user.accessToken);
    const decode = accessToken ? jwtDecode(accessToken) : undefined;
    const roles = decode?.userInfo?.roles ? Object.values(decode?.userInfo?.roles) : [];
    return roles.find(role => allowRoles.includes(role))
        ? <Outlet/> 
        : roles.length
        ? <Navigate to={configs.routes.unauthorization} replace/>
        : <Navigate to={configs.routes.login} replace/>
        
}

export default ProtectedRoute;
