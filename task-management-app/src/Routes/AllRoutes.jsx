import { Route, Routes } from "react-router-dom";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import CreateTask from "../Pages/CreateTask";


function AllRoutes(){
    return(
        <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/create-task" element={<CreateTask/>}/>
        </Routes>
    )
}
export default AllRoutes