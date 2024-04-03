import { Routes, Route} from "react-router-dom";
import Login from "./pages/login/login";
import './App.css'
import Register from "./pages/register/register";

function App() {
  

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

        </Routes>
      </div>
    </>
  )
}

export default App;
