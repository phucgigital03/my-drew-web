import { post } from "~/utils/http";

export const register = async (userForm)=>{
    try{
        const res = await post('/v1/register', userForm);
        return res.data;
    }catch(error){
        if(error?.code === 'ERR_NETWORK'){
            return {
                statusCode: 500,
                errorMessage: error.message 
            }
        }else if(error?.response?.data?.statusCode === 409){
            return error.response.data
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