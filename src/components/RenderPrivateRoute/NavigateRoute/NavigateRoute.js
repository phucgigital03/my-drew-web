import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import configs from "~/configs";

function NavigateRoute({ children }) {
    const accessToken = useSelector(state => state.user.accessToken);
    const decode = accessToken ? jwtDecode(accessToken) : undefined;
    const roles = decode?.userInfo?.roles || {};
    if(roles?.addmin){
        return <Navigate to={configs.routes.addmin}/>
    }else if(roles?.employment){
        return <Navigate to={configs.routes.employment}/>
    }else if(roles?.user){
        return <Navigate to={configs.routes.user}/>
    }else{
        return children
    }
}

export default NavigateRoute;