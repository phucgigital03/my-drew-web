
export const getInfoUser = async(httpPrivate,userId,type,controller)=>{
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
                data: result.data?.data?.[0]?.orders,
                email: result.data?.data?.[0]?.email
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