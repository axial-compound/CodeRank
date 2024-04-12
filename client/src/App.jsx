import { Routes, Route} from "react-router-dom";
import { Provider} from  'react-redux';
import store from "./redux/store";
import Login from "./pages/login/login";
import './App.css'
import Register from "./pages/login/register";
import CodeEditor from "./pages/editor/CodeEditor";

function App() {
  

  return (
    <>
    <Provider store={store}>
      <div className="app">
        <Routes>
          <Route path="/" element={"welcome to Online Code Editor"}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/editor" element={<CodeEditor/>} />

        </Routes>
      </div>
      </Provider>
    </>
  )
}

export default App;
