import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);

// First, create the thunk
// export const fetchCosmonauts = createAsyncThunk('cosmonauts/fetchCosmonauts', async () => {
//     return fetch('/owners').then((res) => res.json())
//   })

//   export const setRole = createAsyncThunk('rolechoice/setrole', async (role) => {
//     return fetch('/roles/set-role', {
//       method: 'POST',
//       body: JSON.stringify({
//         role: role.role
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//     }
//     }) ))
//   })
export const fetchCatshopitems = createAsyncThunk('catshop/getitems', async () => {
  const res = await axios.get("/catshop").then(response => response.data)
  // .then((response) => {
  //   console.log(response.data.data, "THIS IS IT");
  // }, (error) => {
  //   console.log(error);
  // });
  //console.log(res)
  return res;
  })

  export const fetchMyCatshopitems = createAsyncThunk('catshop/getmyitems', async () => {
    const res = await axios.get("/catshop/my").then(res => res.data)
    // .then((response) => {
    //   console.log(response.data.data, "THIS IS IT");
    // }, (error) => {
    //   console.log(error);
    // });
    //console.log(res)
    return res;
    })

  export const buyItem = createAsyncThunk('catshop/buyitem', async (transaction, {dispatch}) => { //pridat dispatchnutie fetchitems
    const res = await axios.post("/catshop/buy", {
        name: transaction.name //name
   });
   dispatch(fetchCatshopitems());
   dispatch(fetchMyCatshopitems());
   return res;
    })

// Then, handle actions in your reducers:
const catshopSlice = createSlice({
  name: 'catshop',
  initialState: { shopitems: [], myshopitems: [] },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchCatshopitems.fulfilled]: (state, action) => {
      // Add user to the state array
      //state.entities.push(action.payload)
      //console.log(JSON.stringify(action.payload.data), "DAKA ALBAVANAMA")
      state.shopitems=action.payload
    },
    [fetchMyCatshopitems.fulfilled]: (state, action) => {
      // Add user to the state array
      //state.entities.push(action.payload)
      //console.log(JSON.stringify(action.payload.data), "DAKA ALBAVANAMA")
      state.myshopitems=action.payload
    },
  },
})

export const selectShopitems = state => state.catshop.shopitems;
export const selectMyshopitems = state => state.catshop.myshopitems;

export default catshopSlice.reducer;