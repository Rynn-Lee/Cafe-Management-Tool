import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: []
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInfo: (state:any, action) => {
      state.info[0] = action.payload
    },
    deleteInfo: (state) => {
      state.info = []
    }
  }
})

export const { setInfo, deleteInfo } = authSlice.actions;
export default authSlice.reducer