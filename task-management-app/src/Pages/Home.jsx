import { Link } from "react-router-dom";
import style from "../Styles/home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [data, setData]=useState([])
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    handleUserData();
  }, []);

  const handleUserData = () => {
    axios
      .get(`http://localhost:8000/app/users`)
      .then((res) => {
        setUserData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(()=>{
    handleData();
  },[])

  const handleData=()=>{
    fetch(`http://localhost:8000/task/get`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: `${localStorage.getItem("token")}`,
        }
    })
    .then((res)=>res.json())
    .then((res)=>{
       console.log(res)
       setData(res)
      
    })
    .then((err)=>{
        console.log(err)
        
    })
    
  }

  const handleUserName=(userId)=>{
    for(let user of userData){
      if(user._id===userId){
        return user.name
      }
    }

  }

  console.log("res", data)

  return (
    <div className={style.home}>
      <div className={style.navbar}>
        <div>
          <h1>Task Manage App</h1>
        </div>
        <div>
          <Link to="/create-task">
            <button>Create Task</button>
          </Link>
        </div>
      </div>
      
      <div className={style.container}>
        <br />
        <h1>List of All Tasks</h1>
        <div className={style.tablebox}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Checklists</th>
                <th>Project</th>
                <th>Assign to user</th>
                <th>Due date</th>
                <th>Labels</th>
                <th>Add member</th>
              </tr>
            </thead>
            <tbody>
              {data && data?.map((el)=>(
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td>{el.description}</td>
                  <td>
                    {el.checklist.map((todo)=>(
                      <div key={todo._id}>
                        <p>{todo.item}</p>
                      </div>
                    ))}
                  </td>
                  <td>{el.project}</td>
                  <td>
                  {el.assignTo.map((todo)=>(
                      <div key={todo}>
                        <p>{handleUserName(todo)}</p>
                      </div>
                    ))}
                  </td>
                  <td>{el.dueDate}</td>
                  <td>
                  {el.labels.map((todo)=>(
                      <div key={todo}>
                        <p>{todo}</p>
                      </div>
                    ))}
                  </td>
                  <td>
                    <Link to={`/member/${el._id}`}><button>Add Member</button></Link>
                    </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Home;
