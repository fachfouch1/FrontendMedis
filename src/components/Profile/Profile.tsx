import { useEffect, useState } from "react";
import styles from "./profile.module.css"; // Import the CSS module

const ProfilePage = () => {
  const [account, setAccount] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    phone_number: "",
    username: "",
    role: "", // Assuming role is not editable but displayed
    address: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Updated Account:", account);
    // Implementation to update the data on server
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setAccount({
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        password: "", // Password should not be displayed
        phone_number: userData.phone_number,
        username: userData.username,
        role: userData.role,
        address: userData.address,
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Email:</label>
        <input className={styles.input} type="email" name="email" value={account.email} onChange={handleInputChange} />

        <label className={styles.label}>First Name:</label>
        <input
          className={styles.input}
          type="text"
          name="first_name"
          value={account.first_name}
          onChange={handleInputChange}
        />

        <label className={styles.label}>Last Name:</label>
        <input
          className={styles.input}
          type="text"
          name="last_name"
          value={account.last_name}
          onChange={handleInputChange}
        />

        <label className={styles.label}>Password:</label>
        <input
          className={styles.input}
          type="password"
          name="password"
          value={account.password}
          onChange={handleInputChange}
        />

        <label className={styles.label}>Phone Number:</label>
        <input
          className={styles.input}
          type="text"
          name="phone_number"
          value={account.phone_number}
          onChange={handleInputChange}
        />

        <label className={styles.label}>Username:</label>
        <input
          className={styles.input}
          type="text"
          name="username"
          value={account.username}
          onChange={handleInputChange}
        />

        <label className={styles.label}>Address:</label>
        <input
          className={styles.input}
          type="text"
          name="address"
          value={account.address}
          onChange={handleInputChange}
        />

        <button className={styles.button} type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
