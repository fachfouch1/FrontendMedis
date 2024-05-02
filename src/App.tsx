import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import SearchPage from "./components/Search/SearchPage";
import ProfilePage from "./components/Profile/Profile";
import DataPage from "./components/Data/DataPage";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import { useEffect, useState } from "react";
import { IAccount } from "./services/types";
import UsersPage from "./components/UsersPage/UsersPage";

function App() {
  const navigate = useNavigate();
  const pathsToHide = ["/login", "/signup"];
  const isShown = pathsToHide.some((path) => location.pathname === path);
  const [userData, setUserData] = useState<IAccount>();

  useEffect(() => {
    // Check if user is logged in when component mounts
    const loggedInUser = localStorage.getItem("isLoggedIn");
    const userDataStored = localStorage.getItem("userData");

    if (loggedInUser !== "true" && !isShown) {
      if (userDataStored) {
        setUserData(JSON.parse(userDataStored));
      }

      navigate("/login");
    }
  }, []);

  return (
    <>
      {!isShown && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        {userData?.status && <Route path="/" element={<SearchPage />} />}
        {userData?.status && <Route path="/data" element={<DataPage />} />}
        {userData?.status && <Route path="/users" element={<UsersPage />} />}
      </Routes>
    </>
  );
}

export default App;
