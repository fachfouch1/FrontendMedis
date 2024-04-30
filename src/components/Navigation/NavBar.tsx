import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";

const NavBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.navBarStyle}>
        <NavLink to="/" className={({ isActive }) => styles.buttonStyle + " " + (isActive ? styles.buttonActive : "")}>
          Search
        </NavLink>
        <NavLink
          to="/data"
          className={({ isActive }) => styles.buttonStyle + " " + (isActive ? styles.buttonActive : "")}
        >
          Data
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => styles.buttonStyle + " " + (isActive ? styles.buttonActive : "")}
        >
          Profile
        </NavLink>
      </div>
      <button style={{ zIndex: 1000 }} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default NavBar;
