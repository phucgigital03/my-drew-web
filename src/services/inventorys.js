import { toast } from 'react-toastify';

const convertToForm = (formInventory)=>{
    const formData = new FormData();
    for(const key in formInventory){
        if(key === 'listImg' && formInventory[key]){
            for(let i = 0;i < formInventory[key].length;++i){
                formData.append(key,formInventory[key][i])
            }
        }else{
            formData.append(key,formInventory[key])
        }
    }
    return formData
}

const addinventoryApi = async (httpPrivate,formInventory)=>{
    try{
        const formData = convertToForm(formInventory);
        const resultApi = await toast.promise(httpPrivate.post('/v1/api/inventory',formData),{
            pending: "Promise is pending",
            success: "Promise  Loaded",
            error: "error"
        })
        if(resultApi.data?.statusCode === 200){
            return {
                statusCode: 200,
                message: 'create success inventory'
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

const getinventoryApi = async (httpPrivate,type,controller,limit = 5,page = 1)=>{
    try{
        const resultApi = await httpPrivate.get('/v1/api/inventory',{
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
                ...resultApi.data?.data,
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

const updateinventoryApi = async (httpPrivate,id,formInventory)=>{
    try{
        const formData = convertToForm(formInventory)
        const resultApi = await toast.promise(httpPrivate.patch(`/v1/api/inventory/${id}`,formData), {
            pending: "Promise is pending",
            success: "Promise  Loaded",
            error: "error"
        });
        if(resultApi.data?.statusCode === 200){
            return {
                statusCode: 200,
                message: 'update successfully',
                inventory: resultApi.data?.data?.[0]
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

const deleSortInventory = async (httpPrivate,id)=>{
    try{
        const resultApi = await toast.promise(httpPrivate.delete('/v1/api/inventory',{
            params: {
                idInventory: id
            }
        }),{
            pending: "Promise is pending",
            success: "Promise  Loaded",
            error: "error"
        });
        if(resultApi.data?.statusCode === 200){
            return {
                statusCode: 200,
                message: resultApi.data?.message
            }
        }
    }catch(error){
        if(error.response.data?.statusCode === 400){
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
    addinventoryApi,
    getinventoryApi,
    updateinventoryApi,
    deleSortInventory
}