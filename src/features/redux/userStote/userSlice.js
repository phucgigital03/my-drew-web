import { createSlice } from '@reduxjs/toolkit'
import reducers from './reducers'
import extraReducers from './extraReducers'

const initialState = {
  email: '',
  roles: {
    addmin: 9999,
    user: 2003,
    employment: 2004,
  },
  isLoading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: reducers,
  extraReducers: extraReducers
})

const { reducer: userReducer, actions } = userSlice
export const { updateEmail } = actions
export default userReducer