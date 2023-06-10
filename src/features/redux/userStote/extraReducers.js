import { createAsyncThunk } from '@reduxjs/toolkit'

const fakeApi = (data)=>{
  return new Promise((resolve,reject)=>{
      if(data){
        resolve(data);
      }else{
        reject({
          errorCode: 200
        })
      }
  })
}

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId, {dispatch,rejectWithValue}) => {
    try{
      const response = await fakeApi();
      return response
    }catch(err){
      return rejectWithValue(err);
    }
  }
)

const extraReducers =  (builder) => {
  // fetchUserById
  builder.addCase(fetchUserById.pending, (state) => {
    state.isLoading = false;
  });
  builder.addCase(fetchUserById.fulfilled, (state, action) => {
    console.log(action.payload)
    state.isLoading = true;
  });
  builder.addCase(fetchUserById.rejected, (state, action) => {
    console.log(action.payload)
    console.log(action.error)
    state.isLoading = false;
  });
  // 
}

export default extraReducers