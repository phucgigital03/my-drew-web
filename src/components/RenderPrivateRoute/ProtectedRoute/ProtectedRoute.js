import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import configs from "~/configs";

function ProtectedRoute({ allowRoles }) {
    const user = useSelector(state => state.user)
    const roles = user.roles ? Object.values(user?.roles) : []
    return roles.find(role => allowRoles.includes(role))
        ? <Outlet/> 
        : roles.length
        ? <Navigate to={configs.routes.unauthorization} replace/>
        : <Navigate to={configs.routes.login} replace/>
        
}

export default ProtectedRoute;
