import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to CodeRank</h1>
      <h4>Your Cloud Code Editor</h4>
      <button className="sign-in">Sign in</button>
      <div>
        <button className="continue-as-guest">Continue as Guest</button>
      </div>
    </div>
  );
};

export default Home;