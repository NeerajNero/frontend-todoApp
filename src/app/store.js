import { configureStore } from "@reduxjs/toolkit";
import authreducer from '../features/authSlice'
import todoReducer from '../features/todoSlice'
export const store = configureStore({
    reducer: {
        auth: authreducer, todo: todoReducer
    }  
})