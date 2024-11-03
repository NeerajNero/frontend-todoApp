import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import LoginAndRegister from "./components/loginAndRegister"
import ProtectedPage from "./components/myProtectedPage"
import Register from "./components/register"
import { ToastContainer} from "react-toastify"
import "react-toastify/ReactToastify.css"
import "bootstrap/dist/css/bootstrap.min.css"
function App() {

  return (
    <>
      <Router>
      <ToastContainer />
      <div className="bg-light">
      <div className="container text-center">
      <h1 className="py-3">My Todo APP</h1>
      <h2 className="py-3">Want to experience our Todo App</h2>
      
     <Link to="/login">Explore Todo APP</Link>
     <Routes>
      <Route path="/login" element={<LoginAndRegister />}/>
      <Route path="/protectedRoute" element={<ProtectedPage />} />
      <Route path="/register" element={<Register />} />
     </Routes>
     </div>
     </div>
     </Router>
    </>
  )
}

export default App
