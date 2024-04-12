
import { Routes, Route} from "react-router-dom";
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Provider} from  'react-redux';
import store from "./redux/store";
import Login from "./pages/login/login";
import './App.css'
import Register from "./pages/login/register";
import CodeEditor from "./pages/editor/CodeEditor";

function App() {
  
  const PrivateRoutes = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  }

  return (
    <>
    <Provider store={store}>
      <div className="app">
        <Routes>
          <Route path="/" element={<div>welcome to Online Code Editor</div>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path='/editor' element={<CodeEditor/>} />
          {/* <Route element={<PrivateRoutes/>}>
              
          </Route> */}

        </Routes>
      </div>
      </Provider>
    </>
  )
}

export default App;
