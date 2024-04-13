import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";

const sentences = [
  "Cloud-based code editor",
  "Seamless coding experience",
  "Coding Redefined",
  "Transforming the way you code",
];

const Home = () => {
  const [currentSentence, setCurrentSentence] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSentence((prev) => (prev + 1) % sentences.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <h1>Welcome to CodeRank &lt;/&gt;</h1>
      <h4>
        <span className="editor-animation">{sentences[currentSentence]}</span>
      </h4>
      <NavLink to="/login">
        <button className="glow-on-hover" type="button">
          Login To Continue &nbsp;
          <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
        </button>
      </NavLink>
      <div>
        <NavLink to="/editor">
          <button className="continue-as-guest">Continue as Guest</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;