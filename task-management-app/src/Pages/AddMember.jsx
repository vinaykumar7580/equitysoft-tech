import { Link, useParams } from "react-router-dom";
import style from "../Styles/createtask.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

function AddMember() {
  const [data, setData] = useState({
    user: "",
    role: "",
  });
  const [userData, setUserData] = useState([]);

  const params = useParams();

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
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let task = params.id;
    let payload = {
      user: data.user,
      tasks: task,
      role: data.role,
    };

    console.log("payload", payload)

    fetch(`http://localhost:8000/member/add`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        alert("Member Added Success");
      })
      .catch((err) => {
        console.log(err);
        alert("Member Added Failed");
      });

    
  };

  //   console.log("params", params);

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
        <br />
        <h1>Add Member</h1>
        <form>
          <div>
            <label>User</label>
            <br />
            <select name="user" value={data.user} onChange={handleChange}>
              {userData &&
                userData?.map((el) => (
                  <option value={el._id}>{el.name}</option>
                ))}
            </select>
          </div>
          <br />

          <label>Role</label>
          <br />
          <select name="role" value={data.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <br />
          <br />
          <button onClick={handleSubmit}>Add Member</button>
        </form>
      </div>
      <div className={style.space}></div>
    </div>
  );
}

export default AddMember;
