import { post,get } from "~/utils/http";

const getURLStripe = async (formData)=>{
    try{
        const resultApi = await post('/v1/stripe/create-checkout-session',formData);
        if(resultApi.data?.statusCode === 200){
            return {
                statusCode: 200,
                url: resultApi.data?.url
            }
        }
        return resultApi
    }catch(error){
        console.log(error)
        return {
            statusCode: 500,
            errorMessage: 'error server'
        }
    }
}

const getURLCOD = async (formData)=>{
    try{
        const resultApi = await post('/v1/api/cod/orders',formData);
        if(resultApi.data?.statusCode === 200){
            return {
                statusCode: 200,
                url: resultApi.data?.url
            }
        }
        return resultApi
    }catch(error){
        console.log(error)
        return {
            statusCode: 500,
            errorMessage: 'error server'
        }
    }
}

const getURLVnpay = async (formData)=>{
    try{
        const resultApi = await post('/v1/api/vnpay/create_payment_url',formData);
        if(resultApi.data?.statusCode === 200){
            return {
                statusCode: 200,
                url: resultApi.data?.url
            }
        }
        return resultApi
    }catch(error){
        console.log(error)
        return {
            statusCode: 500,
            errorMessage: 'error server'
        }
    }
}

const createPaypalOrder = async (formData)=>{
    try{
        const resultApi = await post('/v1/api/paypal/orders',{
            ...formData
        });
        if(resultApi.data?.statusCode === 200){
            return resultApi.data?.id
        }
        return resultApi
    }catch(error){
        console.log(error)
        return {
            statusCode: 500,
            errorMessage: 'error server'
        }
    }
}

const capturePaypalOrder = async(formData,orderID)=>{
    try{
        const resultApi = await post('/v1/api/paypal/capture/orders',{
            orderId: orderID,
            formData: formData
        });
        if(resultApi.data?.statusCode === 200){
            return {
                statusCode: 200,
                url: resultApi.data?.url
            }
        }
        return resultApi
    }catch(error){
        console.log(error)
        return {
            statusCode: 500,
            errorMessage: 'error server'
        }
    }
}

const getOneOrder = async(customerID)=>{
    try{
        const resultApi = await get(`/v1/api/orders/${customerID}`)
        if(resultApi.data?.statusCode === 200){
            return {
                statusCode: 200,
                order: resultApi.data?.orderFound
            }
        }
    }catch(error){
        console.log(error)
        return {
            statusCode: 500,
            errorMessage: 'error server'
        }
    }
}

export {
    getURLStripe,
    getOneOrder,
    getURLCOD,
    createPaypalOrder,
    capturePaypalOrder,
    getURLVnpay
}