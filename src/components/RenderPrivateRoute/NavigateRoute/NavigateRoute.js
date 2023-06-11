import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import configs from "~/configs";

function NavigateRoute({ children }) {
    const user = useSelector(state => state.user);
    const roles = user?.roles ? user?.roles : {};
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