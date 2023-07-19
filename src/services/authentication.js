import { post,get } from "~/utils/http";
import md5 from "md5";

export const register = async (userForm)=>{
    try{
        const resultTimeApi = await get(`/v1/getTime`);
        const stime = resultTimeApi.data.time;
        const nonce = crypto.randomUUID();
        const params = {};
        const sortKey = [];
        let placeHolder = '';
        params.stime = stime;
        params.v = 'v1';
        params.nonce = nonce;
        params.keySecret = 'xxxyyy'; // handle exchange key with diffie-hellman
        for(const key in params){
            if(key !== 'sign'){
                sortKey.push(key);
            }
        }
        sortKey.sort();
        sortKey.forEach(key => {
            placeHolder += `${key}${params[key]}`
        })
        params.sign = md5(placeHolder);
        // delete params secret
        delete params.keySecret;
        delete params.v;
        const resultApi = await post('/v1/register', userForm, {
            params: {
                ...params
            }
        });
        return {
            statusCode: 200,
            data: resultApi.data
        };
    }catch(error){
        if(error?.code === 'ERR_NETWORK'){
            return {
                statusCode: 500,
                errorMessage: error.message 
            }
        }else if(error?.response?.data?.statusCode === 409){
            return {
                statusCode: 409,
                errorMessage: error.response.data.errorMessage 
            }
        }else if(error?.response?.data?.statusCode === 401){
            return {
                statusCode: 401,
                errorMessage: error.response.data.errorMessage 
            }
        }else if(error?.response?.data?.statusCode === 403){
            return {
                statusCode: 403,
                errorMessage: error.response.data.errorMessage 
            }
        }
        return error
    }
}

export const verifyOtp = async (userForm)=>{
    try{
        const resultApi = await post('/v1/register/verifyOtp', userForm);
        return {
            statusCode: 200,
            data: resultApi.data
        };
    }catch(error){
        if(error?.code === 'ERR_NETWORK'){
            return {
                statusCode: 500,
                errorMessage: error.message 
            }
        }else if(error?.response?.data?.statusCode === 409){
            return {
                statusCode: 409,
                errorMessage: error.response.data.errorMessage 
            }
        }else if(error?.response?.data?.statusCode === 401){
            return {
                statusCode: 401,
                errorMessage: error.response.data.errorMessage 
            }
        }
        return error
    }
}

export const login = async (userForm)=>{
    try{
        const res = await post('/v1/login', userForm);
        return res.data;
    }catch(error){
        if(error?.response?.data?.statusCode === 400){
            return error.response.data
        }else if(error?.response?.data?.statusCode === 409){
            return error.response.data
        }else if(error?.response?.data?.statusCode === 401){
            return error.response.data
        }else if(error?.response?.data?.statusCode === 500){
            return error.response.data
        }
        return error
    }
}