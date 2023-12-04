import { Link, useNavigate } from "react-router-dom";
import style from "../Styles/signup&login.module.css";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
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
      .post(`http://localhost:8000/app/login`, formData)
      .then((res) => {
        console.log(res.data.msg, res.data.token);
        if (res.data.msg === "success") {
          alert("User Login Success.");
          localStorage.setItem("token", res.data.token);
          navigate("/");
        } else {
          alert("User Login Failed.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("User Login Failed.");
      });

    console.log("form", formData);
    setFormData({
      email: "",
      password: "",
    });
  };
  const { email, password } = formData;

  return (
    <div className={style.main}>
      <br />
      <br />
      <div className={style.signup}>
        <h1>Login</h1>
        <form>
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
          if you have to signup:{" "}
          <Link to="/signup">
            <span>SignUp</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;
