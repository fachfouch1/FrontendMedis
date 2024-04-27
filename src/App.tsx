import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import SearchPage from "./components/Search/SearchPage";
import ProfilePage from "./components/Profile/Profile";
import DataPage from "./components/Data/DataPage";
import Login from "./components/Authentication/Login";

function App() {
  const pathname = window.location.pathname;
  const isHidden = !pathname.includes("login");
  console.log("isHidden", isHidden);
  return (
    <>
      {isHidden && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/data" element={<DataPage />} />
      </Routes>
    </>
  );
}

export default App;
