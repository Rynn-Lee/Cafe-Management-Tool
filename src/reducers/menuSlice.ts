import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: []
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu: (state:any, action) => {
      state.list = action.payload
    },
    removeMenu: (state: any) => {
      state.list = []
    }
  }
})

export const { setMenu, removeMenu } = menuSlice.actions;
export default menuSlice.reducer