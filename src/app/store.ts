import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../reducers/counter/counterSlice'
import authReducer from '../reducers/auth/authSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  }
})