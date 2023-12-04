import { Link } from "react-router-dom";
import style from "../Styles/home.module.css";

function Home() {
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
        <h1>List of All Tasks</h1>
      </div>
    </div>
  );
}
export default Home;
