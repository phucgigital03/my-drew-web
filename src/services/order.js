import { post,get } from "~/utils/http";

const getURLStripe = async (formData)=>{
    try{
        const resultApi = await post('/v1/create-checkout-session',formData);
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
    getOneOrder
}