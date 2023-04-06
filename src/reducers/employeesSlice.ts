import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: []
}

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state:any, action) => {
      state.list = action.payload
    },
    removeEmployees: (state: any) => {
      state.list = []
    }
  }
})

export const { setEmployees, removeEmployees } = employeesSlice.actions;
export default employeesSlice.reducer