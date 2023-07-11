import { createAsyncThunk } from '@reduxjs/toolkit'
import { post,dele,put } from '~/utils/http';

const cartCallApi = {
  addToCartApi: async (dataAddcart)=>{
    const resultApi = await post('/v1/api/cart',dataAddcart)
    return resultApi
  },
  updatePlus: async (dataPlus)=>{
    const resultApi = await put('/v1/api/cart/plus',dataPlus)
    return resultApi
  },
  updateMinus: async (dataMinus)=>{
    const resultApi = await put('/v1/api/cart/minus',dataMinus)
    return resultApi
  },
  deteProduct: async (dataDele)=>{
    const resultApi = await dele('/v1/api/cart',{
      data: dataDele
    })
    return resultApi
  }
}

export const addCart = createAsyncThunk(
  'cart/addToCart',
  async (dataAddcart, {dispatch,rejectWithValue}) => {
    try{
      const resultApi = await cartCallApi.addToCartApi(dataAddcart);
      return resultApi
    }catch(error){
      return rejectWithValue(error);
    }
  }
)

export const updatePlus = createAsyncThunk(
  'cart/updatePlus',
  async (dataPlus, {dispatch,rejectWithValue}) => {
    try{
      const resultApi = await cartCallApi.updatePlus(dataPlus);
      return resultApi
    }catch(error){
      return rejectWithValue(error);
    }
  }
)

export const updateMinus = createAsyncThunk(
  'cart/updateMinus',
  async (dataMinus, {dispatch,rejectWithValue}) => {
    try{
      const resultApi = await cartCallApi.updateMinus(dataMinus);
      return resultApi
    }catch(error){
      return rejectWithValue(error);
    }
  }
)

export const deleProduct = createAsyncThunk(
  'cart/deleProduct',
  async (dataDele, {dispatch,rejectWithValue}) => {
    try{
      const resultApi = await cartCallApi.deteProduct(dataDele);
      return resultApi
    }catch(error){
      return rejectWithValue(error);
    }
  }
)

const extraReducers =  (builder) => {
  // addToCart
  builder.addCase(addCart.fulfilled, (state, { payload }) => {
    const { cart, products } = payload.data;
    state.cartId = cart._id
    state.products = products
    state.showCart = true
  });

  // updatePlus
  builder.addCase(updatePlus.fulfilled, (state, { payload }) => {
    const { cart, products } = payload.data;
    state.cartId = cart._id
    state.products = products
    state.showCart = true
  });
  // updateMinus
  builder.addCase(updateMinus.fulfilled, (state, { payload }) => {
    const { cart, products } = payload.data;
    state.cartId = cart._id
    state.products = products
    state.showCart = true
  });
  // deleteCart
  builder.addCase(deleProduct.fulfilled, (state, { payload }) => {
    const { cart, products } = payload.data;
    state.cartId = cart._id
    state.products = products
    state.showCart = true
  });
}

export default extraReducers