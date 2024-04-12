import { NavLink } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to CodeRank</h1>
      <h4>Your Cloud Code Editor</h4>
      <NavLink to={"/login"}>
      <button className="sign-in">Login</button>
      </NavLink>
      <div>
        <NavLink to={"/editor"}>
        <button className="continue-as-guest">Continue as  Guest</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;