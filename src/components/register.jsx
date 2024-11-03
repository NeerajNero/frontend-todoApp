import { useState } from "react";
import { register } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Register = () =>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const handleForm = (e) => {
        e.preventDefault()
        const newUser = {
            username : username,
            password: password
        }
        dispatch(register({newUser})).unwrap().then(() => {
            toast.success("Registeration successful")
        }).catch((error) => {
            toast.error("user already exists")
        })
    }
    return(
        <>
        <h1 className="my-3">Register</h1>
        <form onSubmit={handleForm}>
        <label className="mt-2">User Name: </label><br />
        <input  type="text" value={username} onChange={(e) => setUsername(e.target.value)}/><br />
        <label className="mt-2">Password: </label><br />
        <input  type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/><br />
        <button className="btn btn-primary">Login</button>
        </form>
        </>
    )
}
export default Register