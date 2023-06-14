import { Outlet } from "react-router-dom";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";

import useRefreshToken from "~/hooks/useRefreshToken";

function PersistLogin() {
    const [isLoading,setIsLoading] = useState(true);
    const refreshToken = useRefreshToken();
    const user  = useSelector(state => state.user);
    
    useEffect(()=>{
        let mounted = true;
        const verifyRefreshToken = async ()=>{
            try{
                await refreshToken()
            }catch(err){
                console.log(err)
            }finally{
                mounted && setIsLoading(false)
            }
        }
        !user?.accessToken ? verifyRefreshToken() : setIsLoading(false)
        return ()=>{
            mounted = false
        }
    },[])

    useEffect(()=>{
        console.log(`isLoading ${isLoading}`);
        console.log(`accessToken ${user?.accessToken}`);
    },[isLoading])

    return (
        <>
        {
            isLoading 
                ?  <p>Loading...</p> 
                :  <Outlet/>
        }
        </> 
    );
}

export default PersistLogin;