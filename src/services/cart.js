import { get } from '~/utils/http'

const getCart = async (cartId,signal)=>{
    try{
        const resultApi = await get(`/v1/api/cart/${cartId}`,{
            signal
        })
        console.log(resultApi)
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
            errorMessage: 'error message'
        }
    }
} 

export {
    getCart
}