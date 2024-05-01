import { useEffect, useState } from "react";
import styles from "./profile.module.css"; // Import the CSS module
import { IAccount } from "../../services/types";
import { updateUser } from "../../services/utils";

const ProfilePage = () => {
  const [account, setAccount] = useState<IAccount>({
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    phone_number: "",
    username: "",
    role: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    for (let key in account) {
      if (account[key as keyof IAccount] === "" && key !== "password") {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      let accountCopy = { ...account };
      if(account.password === "") {
        accountCopy = { ...account, password: undefined };
        
      } 
      const response = await updateUser(accountCopy);
      if (response.status === 200) {
        alert("Account updated successfully");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert("Please fill all the fields correctly.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setAccount({
        id: userData.userId,
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
        <span className={styles.span}>Role: {account.role}</span>
        <button disabled={loading} className={styles.button} type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
