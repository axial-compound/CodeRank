import { Routes, Route } from "react-router-dom";
// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import Home from "./pages/home/home";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import Login from "./pages/login/login";
import "./App.css";
import Register from "./pages/login/register";
import CodeEditor from "./pages/editor/CodeEditor";

function App() {
  // const PrivateRoutes = () => {
  //   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  // }

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="app">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/editor" element={<CodeEditor />} />
              {/* <Route element={<PrivateRoutes/>}>
              
          </Route> */}
            </Routes>
          </div>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
