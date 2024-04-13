import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './home.css';

const Home = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={`home ${animate ? 'animate' : ''}`}>
      <h1>Welcome to CodeRank</h1>
      <h4>Your Cloud Code Editor</h4>
      <NavLink to="/login">
        <button className="glow-on-hover" type="button">Login To Continue</button>
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
