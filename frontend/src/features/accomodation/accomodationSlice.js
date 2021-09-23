import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);

export const fetchOwners = createAsyncThunk('accomodation/getowners', async () => {
  console.log('console logging in owners fetch')
  const res = await axios.get("/owners").then(response => response.data)
  console.log(res)
  return res;
  })

  export const fetchShelters = createAsyncThunk('accomodation/getshelters', async () => {
    const res = await axios.get("/shelters").then(response => response.data)
    return res;
    })
  
    export const getMyActiveStay = createAsyncThunk('accomodation/active', async () => {
      const res = await axios.get("/stays/active").then(response => response.data)
      console.log(res, "printing active stay object")
      return res;
      })

       export const setStay = createAsyncThunk('accomodation/setstay', async (stay, {dispatch}) => {
        const res = await axios.post("/stays/setstay", {
        id: stay.place_id,
        type: stay.place_type
   });
      dispatch(getMyActiveStay())
      dispatch(fetchOwners())
      dispatch(fetchShelters())
      return res;
    })

    export const cancelStay = createAsyncThunk('accomodation/cancelstay', async (stay, {dispatch}) => {
      const res = await axios.post("/stays/cancelstay", {
        id: stay.id,
        type: stay.type
    });
      dispatch(getMyActiveStay())
      dispatch(fetchOwners())
      dispatch(fetchShelters())
      return res;
      });

const accomodationSlice = createSlice({
  name: 'accomodation',
  initialState: { owners: [], shelters: [], active: {} },
  reducers: {
  },
  extraReducers: {
    [fetchOwners.fulfilled]: (state, action) => {
      state.owners=action.payload
    },
    [fetchShelters.fulfilled]: (state, action) => {
      state.shelters=action.payload
    },
    [getMyActiveStay.fulfilled]: (state, action) => {
      state.active=action.payload
    },
  },
})

export const selectOwners = state => state.accomodation.owners;
export const selectShelters = state => state.accomodation.shelters;
export const selectActive = state => state.accomodation.active;

export default accomodationSlice.reducer;