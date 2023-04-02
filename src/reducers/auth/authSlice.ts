import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: ""
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload
    },
    deleteInfo: (state) => {
      state.info = ""
    }
  }
})

export const { setInfo, deleteInfo } = authSlice.actions;
export default authSlice.reducer