import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Session from "supertokens-auth-react/recipe/session";
const axios = require('axios');
Session.addAxiosInterceptors(axios);

export const getRole = createAsyncThunk('rolechoice/getrole', async () => {
  return axios.get("/roles/get-role").then(response => response.data);
  })

  export const setRole = createAsyncThunk('rolechoice/setrole', async (role) => {
    return axios.post("/roles/set-role", {
        role: role.role,
        catrace: role.catrace,
        catname: role.catname,
        catgender: role.catgender,
        ownername: role.ownername,
        occupation: role.occupation,
        img: role.img,
        room: role.room
   })
    })

  export const getMe = createAsyncThunk('rolechoice/getme', async () => {
    return axios.get("/users/me").then(response => response.data[0]);
    })

const rolechoiceSlice = createSlice({
  name: 'rolechoice',
  initialState: { visible: true, getrolefulfilled: false, role: 'none', me: {} }, 
  reducers: {
    setReduxRole(state, action) {
      state.role=action.payload;
    }
  },
  extraReducers: {
    [setRole.fulfilled]: (state, action) => {
      state.visible=false
    },
    [getRole.fulfilled]: (state, action) => {
      state.role=action.payload.role
      state.getrolefulfilled=true
    },
    [getMe.fulfilled]: (state, action) => {
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