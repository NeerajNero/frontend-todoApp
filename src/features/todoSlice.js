import axios from 'axios'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    todo: [],
    status: 'idle',
    error: null
}
export const addTodo = createAsyncThunk('adding todo data', async({newTodo}) => {
    const response = await axios.post('https://backend-todo-app-tan.vercel.app//todos/addTodo', newTodo, {withCredentials: true});
    return response.data
})

export const getTodos = createAsyncThunk('allTodos', async() => {
    const response = await axios.get("https://backend-todo-app-tan.vercel.app//todos/getTodos", {withCredentials: true});
    return response.data
})
export const deleteTodo = createAsyncThunk('deleteTodo', async({id}) => {
    const response = await axios.delete(`https://backend-todo-app-tan.vercel.app//todos/deleteTodo/${id}`, {withCredentials: true})
    return response.data
})
export const updateStatus = createAsyncThunk("updateStatus", async({completed, id}) => {
    const response = await axios.put(`https://backend-todo-app-tan.vercel.app//todos/updateStatus/${id}`, {completed: completed}, {withCredentials: true})
    return response.data
})
const todoSlice = createSlice({
    name: "TODO",
    initialState,
    reducers: {
        clearTodos : (state) => {
            state.todo = [];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(addTodo.pending, (state) => {
            state.status = "loading"
        })
        .addCase(addTodo.fulfilled, (state,action) => {
            state.status = "successful",
            state.todo.push(action.payload)
        })
        .addCase(addTodo.rejected, (state,action) => {
            state.status = "failed",
            state.error = action.error.message
        })
        builder
        .addCase(getTodos.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getTodos.fulfilled, (state,action) => {
            state.status = "successful",
            state.todo = action.payload
        })
        .addCase(getTodos.rejected, (state,action) => {
            state.status = "failed",
            state.error = action.error.message
        })
        builder
        .addCase(deleteTodo.pending, (state) => {
            state.status = "loading"
        })
        .addCase(deleteTodo.fulfilled, (state) => {
            state.status = "successful"
            
        })
        .addCase(deleteTodo.rejected, (state,action) => {
            state.status = "failed",
            state.error = action.error.message
        })
        builder
        .addCase(updateStatus.pending, (state) => {
            state.status = "loading"
        })
        .addCase(updateStatus.fulfilled, (state, action) => {
            state.status = "successful"
            const index = state.todo.findIndex(todo => todo._id === action.payload._id);
                if (index !== -1) {
                    state.todo[index] = {...state.todo[index], completed: action.payload.completed}
                }
        })
        .addCase(updateStatus.rejected, (state,action) => {
            state.status = "failed",
            state.error = action.error.message
        })
    }
})
export const {clearTodos} = todoSlice.actions
export default todoSlice.reducer;