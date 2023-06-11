import { createSlice } from '@reduxjs/toolkit'
import reducers from './reducers'
import extraReducers from './extraReducers'

const initialState = {
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: reducers,
  extraReducers: extraReducers
})

const { reducer: userReducer, actions } = userSlice
export const { updateUser } = actions
export default userReducer