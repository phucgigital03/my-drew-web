import { useDispatch } from "react-redux";

import { get } from "~/utils/http";
import { deleUser } from "~/features/redux/userStote";

function useLogOut() {
    const dispatch = useDispatch();
    const logout = async()=>{
        try{
            await get('/v1/logout',{
                withCredentials: true,
            })
            dispatch(deleUser())
        }catch(error){
            console.log(error)
        }
    }
    return logout;
}

export default useLogOut;