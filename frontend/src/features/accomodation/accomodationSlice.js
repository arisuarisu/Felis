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

  // export const setOwnerstay = createAsyncThunk('accomodation/setownerstay', async (id) => {
  //   return axios.post("/owners/ownerstay", {
  //       id: id.id
  //  });
  //   })

  //   export const setShelterstay = createAsyncThunk('accomodation/setshelterstay', async (id) => {
  //     return axios.post("/shelters/shelterstay", {
  //       id: id.id
  //    });
  //     })

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

      // export const endShelterstay = createAsyncThunk('accomodation/endshelterstay', async (id) => {
      //   return axios.post("/shelters/shelterstay");
      //   })

      //   export const endShelterstay = createAsyncThunk('accomodation/endshelterstay', async (id) => {
      //     return axios.post("/shelters/shelterstay");
      //     })

// Then, handle actions in your reducers:
const accomodationSlice = createSlice({
  name: 'accomodation',
  initialState: { owners: [], shelters: [], active: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
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