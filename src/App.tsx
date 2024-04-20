import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import SearchPage from "./components/Search/SearchPage";
import ProfilePage from "./components/Profile/Profile";
import DataPage from "./components/Data/DataPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/data" element={<ProfilePage />} />
        <Route path="/profile" element={<DataPage />} />
      </Routes>
    </>
  );
}

export default App;
