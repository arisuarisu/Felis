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
export const getRole = createAsyncThunk('rolechoice/getrole', async () => {
  return axios.get("/roles/get-role").then(response => response.data);
  })

  export const setRole = createAsyncThunk('rolechoice/setrole', async (role) => {
    //console.log(role, catname, catrace, catgender, ownername, 'pritning axios params')
    return axios.post("/roles/set-role", {
        role: role.role,
        catrace: role.catrace,
        catname: role.catname,
        catgender: role.catgender,
        ownername: role.ownername,
        occupation: role.occupation,
        img: role.img,
        room: role.room
   })//.then(console.log(role, catname, catrace, catgender, ownername));
    })
  //})
  export const getMe = createAsyncThunk('rolechoice/getme', async () => {
    return axios.get("/users/me").then(response => response.data[0]);
    })

// Then, handle actions in your reducers:
const rolechoiceSlice = createSlice({
  name: 'rolechoice',
  initialState: { visible: true, getrolefulfilled: false, role: 'none', me: {} }, //role: 'none'
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setReduxRole(state, action) {
      state.role=action.payload;
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [setRole.fulfilled]: (state, action) => {
      // Add user to the state array
      //state.entities.push(action.payload)
      state.visible=false
    },
    [getRole.fulfilled]: (state, action) => {
      // Add user to the state array
      //state.entities.push(action.payload)
      //console.log('GETROLE RES: ', action.payload.role)
      state.role=action.payload.role
      state.getrolefulfilled=true
    },
    [getMe.fulfilled]: (state, action) => {
      // Add user to the state array
      //state.entities.push(action.payload)
      state.me=action.payload
    },
  }
})

export const { setReduxRole } = rolechoiceSlice.actions

export const selectGetrolefulfilled = state => state.rolechoice.getrolefulfilled;
export const selectVisible = state => state.rolechoice.visible;
export const selectRole = state => state.rolechoice.role;
export const selectMe = state => state.rolechoice.me;

export default rolechoiceSlice.reducer;