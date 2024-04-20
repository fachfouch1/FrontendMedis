import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";

const NavBar = () => {
  return (
    <div className={styles.navBarStyle}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          styles.buttonStyle + " " + (isActive ? styles.buttonActive : "")
        }
      >
        Search
      </NavLink>
      <NavLink
        to="/data"
        className={({ isActive }) =>
          styles.buttonStyle + " " + (isActive ? styles.buttonActive : "")
        }
      >
        Data
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          styles.buttonStyle + " " + (isActive ? styles.buttonActive : "")
        }
      >
        Profile
      </NavLink>
    </div>
  );
};

export default NavBar;
