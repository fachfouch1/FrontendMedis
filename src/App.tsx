import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import SearchPage from "./components/Search/SearchPage";
import ProfilePage from "./components/Profile/Profile";
import DataPage from "./components/Data/DataPage";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";

function App() {
  const pathsToHide = ["login", "signup"];
  const isShown = pathsToHide.some((path) => location.pathname === path);
  return (
    <>
      {isShown && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/data" element={<DataPage />} />
      </Routes>
    </>
  );
}

export default App;
