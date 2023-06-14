import { useEffect } from "react";
import { useSelector } from 'react-redux'

import { httpPrivate } from "~/utils/http";
import useRefreshToken from "./useRefreshToken";

function useAxiosPrivate() {
    const accessToken = useSelector(state => state.user.accessToken)
    const refreshToken = useRefreshToken(); 
    useEffect(()=>{
        let refreshTokenPromise = null;
        console.log(`accessToken,let Request: ${accessToken}`)
        const request = httpPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error)=>{
                return Promise.reject(error);
            },
        );
        const response = httpPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                console.log(prevRequest.sent,error.response.status,error.response.data?._retry)
                if(!prevRequest.sent && error.response.status === 401 && error.response.data?._retry){
                    prevRequest.sent = true;
                    refreshTokenPromise = refreshTokenPromise ? refreshTokenPromise : refreshToken();
                    const newAccessToken = await refreshTokenPromise;
                    refreshTokenPromise = null;
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return httpPrivate(prevRequest);
                }
                return Promise.reject(error);
            },
        );
        return ()=>{
            httpPrivate.interceptors.response.eject(response);
            httpPrivate.interceptors.request.eject(request);
        }
    },[accessToken])
    return httpPrivate
}

export default useAxiosPrivate;
