
const addproductApi = async (httpPrivate,formProduct)=>{
    try{
        const formData = new FormData();
        for(const key in formProduct){
            if(key === 'listImg'){
                for(let i = 0;i < formProduct[key].length;++i){
                    formData.append(key,formProduct[key][i])
                }
            }else{
                formData.append(key,formProduct[key])
            }
        }
        const resultApi = await httpPrivate.post('/v1/api/products',formData)
        if(resultApi.data?.statusCode === 200){
            return {
                statusCode: 200,
                message: 'create success product'
            }
        }
        console.log(resultApi)
        return resultApi;
    }catch(error){
        console.log(error)
        if(error.response.data?.statusCode === 400){
            return {
                ...error.response.data
            }
        }else if(error.response.data?.statusCode === 409){
            return {
                ...error.response.data
            }
        }
        return {
            statusCode: 500,
            errorMessage: 'error server'
        }
    }
}

export {
    addproductApi
}