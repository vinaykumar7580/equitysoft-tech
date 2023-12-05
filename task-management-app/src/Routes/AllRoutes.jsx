import { Route, Routes } from "react-router-dom";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import CreateTask from "../Pages/CreateTask";
import AddMember from "../Pages/AddMember";


function AllRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/create-task" element={<CreateTask/>}/>
            <Route path="/member/:id" element={<AddMember/>}/>
        </Routes>
    )
}
export default AllRoutes