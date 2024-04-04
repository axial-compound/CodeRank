import { Routes, Route} from "react-router-dom";
import Login from "./pages/login/login";
import './App.css'
import Register from "./pages/register/register";
import CodeEditor from "./pages/editor/CodeEditor";

function App() {
  

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={"welcome to Online Code Editor"}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/editor" element={<CodeEditor/>} />

        </Routes>
      </div>
    </>
  )
}

export default App;
