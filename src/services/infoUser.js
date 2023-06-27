
export const getInfoUser = async(httpPrivate,idUser,type,controller)=>{
    try{
        const result = await httpPrivate.get('/v1/api/users',{
            params: {
                idUser: idUser,
                type
            },
            signal: controller.signal
        })
        if(result.data?.statusCode === 200){
            return {
                statusCode: 200,
                data: result.data?.data[0]?.orderHistorys,
                email: result.data?.data[0]?.email
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