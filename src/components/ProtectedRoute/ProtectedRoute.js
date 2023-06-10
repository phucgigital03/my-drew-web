import { Navigate, Outlet } from "react-router-dom";

import configs from "~/configs";

function ProtectedRoute({user,children,redirectPath = configs.routes.login}) {
    const roles =  Object.values(user.roles);
    if(!roles?.length){
        return <Navigate to={redirectPath} replace/>
    }
    return children ? children : <Outlet/>
}

export default ProtectedRoute;