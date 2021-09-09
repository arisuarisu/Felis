import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// First, create the thunk
export const fetchCosmonauts = createAsyncThunk('cosmonauts/fetchCosmonauts', async () => {
    return fetch('/owners').then((res) => res.json())
  })

  export const addNewcosmo = createAsyncThunk('cosmonauts/addNewcosmo', async (cosmo, dispatch) => {
    return fetch('/owners/new', {
      method: 'POST',
      body: JSON.stringify({
        nickname: cosmo.nickname,
        password: cosmo.password,
        email: cosmo.email
      }),
      headers: {
        'Content-Type': 'application/json'
    }
    }).then(dispatch(fetchCosmonauts()))
  })

// Then, handle actions in your reducers:
const cosmoSlice = createSlice({
  name: 'cosmonauts',
  initialState: { entities: [] },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchCosmonauts.fulfilled]: (state, action) => {
      // Add user to the state array
      //state.entities.push(action.payload)
      state.entities=action.payload
    }
  }
})

export const selectCosmonauts = state => state.cosmonauts.entities;

export default cosmoSlice.reducer;