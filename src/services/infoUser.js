
const getInfoUser = async(httpPrivate,userId,type,controller)=>{
    try{
        const result = await httpPrivate.get('/v1/api/users',{
            params: {
                userId: userId,
                type
            },
            signal: controller.signal
        })
        if(result.data?.statusCode === 200){
            return {
                statusCode: 200,
                orders: result.data?.orders,
                email: result.data?.email
            }
        }
    }catch(error){
        console.log(error)
        if(error?.response?.data?.statusCode === 403){
            return {
                statusCode: 403,
                errorMessage: error?.response?.data?.errorMessage
            }
        }
        return {
            statusCode: 500,
            errorMessage: 'error server'
        }
    }
}

export {
    getInfoUser
}