import { Link, useNavigate } from "react-router-dom";
import style from "../Styles/signup&login.module.css";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8000/app/register`, formData)
      .then((res) => {
        if (res.data.msg === "success") {
          alert("User Register Success.");
          navigate("/login");
        } else {
          alert("User Registration Failed.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("User Registration Failed.");
      });

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };
  const { name, email, password } = formData;

  return (
    <div className={style.main}>
      <br />
      <br />
      <div className={style.signup}>
        <h1>SignUp</h1>
        <form>
          <label>Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </form>
        <br />
        <p>
          You have already register:{" "}
          <Link to="/login">
            <span>Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;
