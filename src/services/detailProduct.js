import { get } from "~/utils/http";

const getProducts = async (signal,title)=>{
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

const getProductRefs = async (signal)=>{
    try{
        const resultApi = await get(`/v1/api/product`,{
            signal,
            params: {
                category: 'newArrivals',
                type: 'productRefs'
            }
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
    getProducts,
    getProductRefs
}