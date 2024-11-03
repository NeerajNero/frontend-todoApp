import { useEffect, useState } from "react";
import { accessProtectedRoute } from "../features/authSlice"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { addTodo, getTodos, deleteTodo, updateStatus } from "../features/todoSlice";
import { clearTodos } from "../features/todoSlice";
import { toast } from "react-toastify";
const ProtectedPage = () => {
    const [todoSubject, setTodoSubject] = useState("");
    const [todoDescription, setTodoDescription] = useState("");
    const [checked, setChecked] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const protectedData = useSelector((state) => state.protectedData)
    const todos = useSelector((state) => state.todo.todo)
    const todoData = todos ? todos : ""
    useEffect(() => {
        dispatch(accessProtectedRoute());
    },[dispatch])
    const handleLogout = (e) => {
        dispatch(logout()).unwrap().then(() => {
            dispatch(clearTodos());
            toast.success("Logged Out Successfully")    
            navigate('/login')
        }) 
    }
    const handleForm = (e) => {
        e.preventDefault();
        try{
            const newTodo = {
                todoSubject: todoSubject,
                todoDescription: todoDescription
            }
            dispatch(addTodo({newTodo})).unwrap();
            setTodoSubject("")
            setTodoDescription("")
            toast.success("Todo Added Successfully")
            dispatch(getTodos());
        }catch(error){
            toast.error("error occured while adding todo")
        }
        
    }
    const handleGetTodos = (e) => {
        e.preventDefault();
        try{
            dispatch(getTodos()).unwrap()
            toast.success("todos fetched successfully")
        }catch(error){
            toast.error("unable to fetch todos")
        }
        
    }
    const handleDelete = (e,id) => {
        e.preventDefault()
        try{
            dispatch(deleteTodo({id}))
            dispatch(getTodos());
            toast.success("todo deleted successfully")
        }catch(error){
            toast.error("unable to delete todo")
        }
        
    }
    const handleChecked = (completed, id) => {
        try{
            dispatch(updateStatus({completed, id})).unwrap()
            toast.success("status updated successfully")
        }catch(error){
            toast.error("unable to update status")
        }
        
    }
    return(
        <>
        <div>
        <button className="btn btn-danger my-3" onClick={handleLogout}>Logout</button>
            <form onSubmit={handleForm}>
                <h2 className="my-3">Add Todo</h2>

                <label>Todo Subject</label><br/>
                <input value={todoSubject} onChange={(e) => setTodoSubject(e.target.value)}/><br/>
                <label>Todo Description</label><br/>
                <input value={todoDescription} onChange={(e) => setTodoDescription(e.target.value)}/><br/><br/>
                <button className="btn btn-primary my-3">Add Todo</button>
            </form>
            <button className="btn btn-info my-3" onClick={handleGetTodos}>Get Todos</button>
            <ul className="list-group">
                {todoData ? todoData.map((todo) => <li className="list-group-item" key={todo._id}>{todo.todoSubject} - {todo.todoDescription} - <label><input type="checkbox" onChange={() => handleChecked(!todo.completed, todo._id)} checked={todo.completed}/> {todo.completed ? "Completed" : "Incomplete"}</label> - <button className="btn btn-danger" onClick={(e) => handleDelete(e,todo._id)}>Delete</button></li>) : ""}
            </ul>
        </div>
        </>
    )
}
export default ProtectedPage