import { configureStore } from "@reduxjs/toolkit";
import employeesSlice from './../reducers/employeesSlice';
import authReducer from '../reducers/authSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesSlice,
  }
})