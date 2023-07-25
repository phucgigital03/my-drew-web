import { get } from '~/utils/http'

const searchProductApis = async (option,signal)=>{
    try{
        const resultApi = await get(`/v1/api/search/getProduct`,{
            signal,
            ...option
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
    searchProductApis
}