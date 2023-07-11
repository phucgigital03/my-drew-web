import { get } from "~/utils/http";

const getProductsFilter = async (signal,category,price,size)=>{
    try{
        const resultApi = await get('/v1/api/product',{
            signal,
            params: {
                category,
                price,
                size
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
    getProductsFilter
}