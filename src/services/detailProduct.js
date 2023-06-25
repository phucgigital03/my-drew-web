import { get } from "~/utils/http";

const getRefProducts = async (signal,title)=>{
    try{
        const resultApi = await get(`/v1/api/product/${title}`,{
            signal
        })
        if(resultApi.data?.statusCode === 200){
            return {
                statusCode: 200,
                products: resultApi.data?.products
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

export {
    getRefProducts,
}