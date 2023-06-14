import { createSlice } from '@reduxjs/toolkit'
import reducers from './reducers'
import extraReducers from './extraReducers'

const initialState = {
  accessToken: null,
  email: null,
  _id: null,
  roles: null,
  firstName: null,
  lastName: null,
  orderHistorys: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: reducers,
  extraReducers: extraReducers
})

const { reducer: userReducer, actions } = userSlice
export const { updateUser, updateAccessToken ,deleUser } = actions
export default userReducer