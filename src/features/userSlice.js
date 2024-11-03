import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: [],
    status: "idle",
    error: null
}

const userSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {},
    extraReducers: (builer) => {

    }
})
export default userSlice.reducer;