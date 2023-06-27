import { createSlice } from '@reduxjs/toolkit'
import reducers from './reducers'
import extraReducers from './extraReducers'

const initialState = {
    cartId: null,
    showCart: false,
    products: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: reducers,
  extraReducers: extraReducers
})

const { reducer: cartReducer, actions } = cartSlice
export const { openCart,hiddenCart,clearProduct } = actions
export default cartReducer