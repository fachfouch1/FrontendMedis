import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import { useEffect, useState } from "react";
import { IAccount, ROLE } from "../../services/types";

const NavBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    window.location.href = "/login";
  };

  const [account, setAccount] = useState<IAccount>();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setAccount(userData);
    }
  }, []);

  return (
    <div className={styles.navBar}>
      <div className={styles.navBarStyle}>
        {account?.status && (
          <>
            <NavLink
              to="/"
              className={({ isActive }) => styles.buttonStyle + " " + (isActive ? styles.buttonActive : "")}
            >
              Search
            </NavLink>
            <NavLink
              to="/data"
              className={({ isActive }) => styles.buttonStyle + " " + (isActive ? styles.buttonActive : "")}
            >
              Data
            </NavLink>
          </>
        )}
        {account?.role === ROLE.Admin && account?.status && (
          <NavLink
            to="/users"
            className={({ isActive }) => styles.buttonStyle + " " + (isActive ? styles.buttonActive : "")}
          >
            Users
          </NavLink>
        )}
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
