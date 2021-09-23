import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);

export const fetchCatshopitems = createAsyncThunk('catshop/getitems', async () => {
  const res = await axios.get("/catshop").then(response => response.data)
  return res;
  })

  export const fetchMyCatshopitems = createAsyncThunk('catshop/getmyitems', async () => {
    const res = await axios.get("/catshop/my").then(res => res.data)
    return res;
    })

  export const buyItem = createAsyncThunk('catshop/buyitem', async (transaction, {dispatch}) => {
    const res = await axios.post("/catshop/buy", {
        name: transaction.name 
   });
   dispatch(fetchCatshopitems());
   dispatch(fetchMyCatshopitems());
   return res;
    })

const catshopSlice = createSlice({
  name: 'catshop',
  initialState: { shopitems: [], myshopitems: [] },
  reducers: {
  },
  extraReducers: {
    [fetchCatshopitems.fulfilled]: (state, action) => {
      state.shopitems=action.payload
    },
    [fetchMyCatshopitems.fulfilled]: (state, action) => {
      state.myshopitems=action.payload
    },
  },
})

export const selectShopitems = state => state.catshop.shopitems;
export const selectMyshopitems = state => state.catshop.myshopitems;

export default catshopSlice.reducer;