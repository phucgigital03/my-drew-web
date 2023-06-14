import { useDispatch } from 'react-redux'

import { get } from '~/utils/http'
import { updateAccessToken } from '~/features/redux/userStote';

function useRefreshToken() {
    const dispatch = useDispatch();
    const refreshToken = async ()=>{
        const response = await get('/v1/refreshToken',{
            withCredentials: true,
        })
        const accessToken = response.data?.accessToken
        dispatch(updateAccessToken(accessToken))
        return accessToken
    }
    return refreshToken
}

export default useRefreshToken;