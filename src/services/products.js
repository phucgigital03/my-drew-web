import { toast } from 'react-toastify';

const convertToForm = (formProduct)=>{
    const formData = new FormData();
    for(const key in formProduct){
        if(key === 'listImg' && formProduct[key]){
            for(let i = 0;i < formProduct[key].length;++i){
                formData.append(key,formProduct[key][i])
            }
        }else{
            formData.append(key,formProduct[key])
        }
    }
    return formData
}

const addproductApi = async (httpPrivate,formProduct)=>{
    try{
        const formData = convertToForm(formProduct);
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

const getproductApi = async (httpPrivate,type,controller,limit = 5,page = 1)=>{
    try{
        const resultApi = await httpPrivate.get('/v1/api/products',{
            params:{
                type,
                limit,
                page
            },
            signal: controller.signal
        })
        if(resultApi.data?.statusCode === 200){
            return {
                statusCode: 200,
                products: resultApi.data?.data?.products,
                lengthProductNotDele: resultApi.data?.data?.lengthProductNotDele,
                lengthProductDele: resultApi.data?.data?.lengthProductDele,
                lengthAllProduct: resultApi.data?.data?.lengthAllProduct,
            }
        }
    }catch(err){
        console.log(err)
        return {
            statusCode: 500,
            errorMessage: 'error server'
        }
    }
}

const updateproductApi = async (httpPrivate,id,formProduct)=>{
    try{
        const formData = convertToForm(formProduct)
        const resultApi = await toast.promise(httpPrivate.patch(`/v1/api/products/${id}`,formData), {
            pending: "Promise is pending",
            success: "Promise  Loaded",
            error: "error"
        });
        if(resultApi.data?.statusCode === 200){
            return {
                statusCode: 200,
                message: 'update successfully',
                product: resultApi.data?.data?.[0]
            }
        }
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
    addproductApi,
    getproductApi,
    updateproductApi
}