import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);

export const getCats = createAsyncThunk('catfriends/getcats', async () => {
    return axios.get("/cats", {params: {name: 'a'}}).then(res => res.data);
    })

export const searchCatfriends = createAsyncThunk('catfriends/searchcatfriends', async (search) => {
    return axios.post("/cats/search", {name: search.name}).then(res => res.data);
    })

export const fetchCatfriends = createAsyncThunk('catfriends/getcatfriends', async () => {
  return axios.get("/cats/mycatfriends").then(res => res.data)
  })

  export const fetchRequestedCatfriends = createAsyncThunk('catfriends/getrequestedcatfriends', async () => {
    return axios.get("/cats/myrequested").then(res => res.data)
    })

  export const approvecatfriend = createAsyncThunk('catfriends/approvecatfriend', async (catfriend, {dispatch}) => {
    const res = await axios.post("/cats/approve", {
        id: catfriend.id
   });
   dispatch(fetchCatfriends())
   dispatch(fetchRequestedCatfriends())
   return res
    })

    export const requestcatfriend = createAsyncThunk('catfriends/requestcatfriend', async (catfriend, {dispatch}) => {
      const res = await axios.post("/cats/request", {
            id: catfriend.id
       });
       dispatch(fetchCatfriends())
       return res
        })

        export const cancelcatfriend = createAsyncThunk('catfriends/cancelcatfriend', async (catfriend, {dispatch}) => {
          const res = await axios.post("/cats/cancel", {
                id: catfriend.id
           });
           dispatch(fetchCatfriends())
           return res
            })
    

const catfriendsSlice = createSlice({
  name: 'catfriends',
  initialState: { cats: [], searchcatfriends: [], mycatfriends: [], requested: [] },// pending: [] },
  reducers: {
  },
  extraReducers: {
    [getCats.fulfilled]: (state, action) => {
      state.cats=action.payload;
    },
    [fetchCatfriends.fulfilled]: (state, action) => {
      state.mycatfriends=action.payload;
    },
    [searchCatfriends.fulfilled]: (state, action) => {
      state.searchcatfriends=action.payload
    },
    [fetchRequestedCatfriends.fulfilled]: (state, action) => {
      state.requested=action.payload
    },
  },
})

export const selectCats = state => state.catfriends.cats;
export const selectSearchCatfriends = state => state.catfriends.searchcatfriends;
export const selectCatfriends = state => state.catfriends.mycatfriends;
export const selectRequested = state => state.catfriends.requested;

export default catfriendsSlice.reducer;