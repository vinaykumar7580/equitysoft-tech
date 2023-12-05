import { Link } from "react-router-dom";
import style from "../Styles/createtask.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function CreateTask() {
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    checklist: [],
    project: "",
    assignTo: [],
    dueDate: "",
    labels: [],
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleChecklist = (index, value) => {
    const newChecklist = [...taskData.checklist];
    newChecklist[index] = { item: value, completed: false };
    setTaskData({ ...taskData, checklist: newChecklist });
  };

  const handleAssignUser = (e) => {
    const { value } = e.target;

    console.log("assignTo", value)
    setTaskData({ ...taskData, assignTo: [...taskData.assignTo, value] });
    console.log(taskData)
  };

  const handleLabels = (index, value) => {
    const newLabels = [...taskData.labels];
    newLabels[index] = value;
    setTaskData({ ...taskData, labels: newLabels });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("taskData", taskData);

    fetch(`http://localhost:8000/task/add`,{
        method:"POST",
        body:JSON.stringify(taskData),
        headers:{
            "Content-Type":"application/json",
            Authorization: `${localStorage.getItem("token")}`,
        }
    })
    .then((res)=>res.json())
    .then((res)=>{
       console.log(res)
       alert("Task Added Success.")
    })
    .then((err)=>{
        console.log(err)
        alert("Please Login First.")
    })

    setTaskData({
        name: "",
        description: "",
        checklist: [],
        project: "",
        assignTo: [],
        dueDate: "",
        labels: [],
    })

  };
  return (
    <div className={style.mainbox}>
      <div className={style.navbar}>
        <div>
          <h1 style={{ textAlign: "center" }}>Task Manage App</h1>
        </div>
        <div>
          <Link to="/home">
            <button>Home Page</button>
          </Link>
        </div>
      </div>

      <div className={style.taskform}>
        <h1>Create a Task</h1>

        <form>
          <div className={style.formbox}>
            <div>
              <label>Name</label>
              <br />
              <input
                type="text"
                placeholder="Enter name"
                name="name"
                value={taskData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Description</label>
              <br />
              <input
                type="text"
                placeholder="Enter name"
                name="description"
                value={taskData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <br />
          <div className={style.formbox}>
            <div>
              <label>Project Name</label>
              <br />
              <input
                type="text"
                placeholder="Enter project name"
                name="project"
                value={taskData.project}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Assign to user</label>
              <br />
              <select onChange={handleAssignUser}>
                {userData &&
                  userData?.map((el) => (
                    <option value={el._id}>{el.name}</option>
                  ))}
              </select>
            </div>
          </div>
          <br />
          <div className={style.formbox}>
            <div>
              <label>Due date</label>
              <br />
              <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <br />
          <div className={style.formbox}>
            <div>
              <label>Checklist </label>
              <br />
              {taskData.checklist.map((el, index) => (
                <div key={index}>
                  <input
                    type="text"
                    placeholder="Enter Checklist Item"
                    value={el.item}
                    onChange={(e) => handleChecklist(index, e.target.value)}
                  />
                  <br />
                  <br />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setTaskData({
                    ...taskData,
                    checklist: [...taskData.checklist, ""],
                  })
                }
              >
                Add Checklist
              </button>
            </div>
            <br />

            <div>
              <label>Labels </label>
              <br />
              {taskData.labels.map((el, index) => (
                <div key={index}>
                  <input
                    type="text"
                    placeholder="Enter label"
                    value={el}
                    onChange={(e) => handleLabels(index, e.target.value)}
                  />
                  <br />
                  <br />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setTaskData({
                    ...taskData,
                    labels: [...taskData.labels, ""],
                  })
                }
              >
                Add Labels
              </button>
            </div>
          </div>

          <br />
          <br />
          <button onClick={handleSubmit}>Submit Task</button>
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
export default CreateTask;
