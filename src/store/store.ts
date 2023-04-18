import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from './../reducers/employeesSlice';
import authReducer from '../reducers/authSlice'
import menuReducer from '../reducers/menuSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
    menu: menuReducer,
  }
})