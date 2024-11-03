import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const LoginAndRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mode,setMode] = useState("login");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const userData = useSelector((state) => state.user)
    const handleForm = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        }
    
        dispatch(loginUser({user})).unwrap().then((user) => {
            console.log("login successfull", user)
            toast.success("Login successful")
            navigate('/protectedRoute')
        }).catch((error) => {
            console.log('Login failed:', error)
            toast.error("Wrong username or password")
        })
    }
    return(
        <>
        <h1 className="my-3">{mode === "login" ? "Login" : "Register"} to Access Todo App</h1>
        <form className="my-3" onSubmit={handleForm}>
        <label>User Name: </label><br />
        <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/><br />
        <label for="inputPassword6" className="col-form-label">Password: </label><br />
        <input className="form-control" id="inputPassword6"  type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br /><br />
        <button className="btn btn-primary">Login</button><br />
        </form>
        <Link className="my-3" to="/register">New User? Click here to Register</Link>
        </>
    )
}
export default LoginAndRegister