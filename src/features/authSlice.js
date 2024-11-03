import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    user: [], status: 'idle', error: null, protectedData: []
}

export const loginUser = createAsyncThunk('loginUser', async({user}) => {
    console.log("inside asyncthunk  ")
    const response = await axios.post("https://backend-todo-app-tan.vercel.app/auth/login", user, { withCredentials: true })
    console.log("after post call")
    console.log(response.data)
    return response.data
})

export const accessProtectedRoute = createAsyncThunk('accessPR', async() => {
    const response = await axios.get("https://backend-todo-app-tan.vercel.app/private/user/login", {withCredentials: true})
    console.log(response.data)
    return response.data;
})

export const register = createAsyncThunk('register', async({newUser}) => {
    const response = await axios.post("https://backend-todo-app-tan.vercel.app/auth/register", newUser);
    console.log(response.data)
    return response.data
})

export const logout = createAsyncThunk('logout', async() => {
    const response = await axios.get("https://backend-todo-app-tan.vercel.app/auth/logout", {withCredentials: true}) 
    return response.data
})
const authSlice = createSlice({
    name: "AUTHSLICE",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload; 
                state.status = 'succeeded';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            });
        builder
            .addCase(accessProtectedRoute.pending, (state) => {
                state.status = "loading"
            })
            .addCase(accessProtectedRoute.fulfilled, (state,action) => {
                state.status = "success"
                state.protectedData = action.payload.data
            })
            .addCase(accessProtectedRoute.rejected, (state,action) => {
                state.status = "failed"
                state.error = action.error.message
            })
        builder
            .addCase(register.pending, (state) => {
                state.status = "loading"
            })
            .addCase(register.fulfilled, (state) => {
                state.status = "success"
            })
            .addCase(register.rejected, (state,action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            builder
            .addCase(logout.pending, (state) => {
                state.status = "loading"
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = "success"
            })
            .addCase(logout.rejected, (state,action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }
})

export default authSlice.reducer
