import { useEffect, useState } from "react";
import styles from "./login.module.css";
import { IAccount } from "../../services/types";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/utils";

const Signup = () => {
  const [account, setAccount] = useState<IAccount>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    role: "",
  });
  const navigate = useNavigate();

  const handlePhoneInput = (e: any) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setAccount({ ...account, phone_number: value });
    }
  };

  const validateForm = () => {
    for (let key in account) {
      if (account[key as keyof IAccount] === "") {
        return false;
      }
    }

    return true;
  };

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Account:", account);
      registerUser(account);
      navigate("/login");
    } else {
      alert("Please fill all the fields correctly.");
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("isLoggedIn");
    if (loggedInUser === "true") {
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLeft}>
        <img src="/medisSearchLogo.png" alt="searchMedis logo" className={styles.logo} width={"350px"} />
        <h2>Medical department</h2>
        <p>
          Welcome to our MédiSearch app ! This powerful tool is designed to streamline your research journey in the
          field of medicine. This application specializes in extracting valuable data from various websites, providing a
          seamless experience for gathering information on molecules crucial to your report. Effortlessly generate
          comprehensive PDFs for your medical research, allowing you to focus more on analysis and insights.
        </p>
        <div className={styles.footerText}>Happy researching!</div>
      </div>
      <div className={styles.loginRight}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <input
            className={styles.input}
            type="text"
            placeholder="First Name"
            value={account.first_name}
            onChange={(e) => setAccount({ ...account, first_name: e.target.value })}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Last Name"
            value={account.last_name}
            onChange={(e) => setAccount({ ...account, last_name: e.target.value })}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            value={account.username}
            onChange={(e) => setAccount({ ...account, username: e.target.value })}
          />
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={account.email}
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={account.password}
            onChange={(e) => setAccount({ ...account, password: e.target.value })}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Phone Number"
            value={account.phone_number}
            onChange={(e) => handlePhoneInput(e)}
            maxLength={8}
          />

          <input
            className={styles.input}
            type="text"
            placeholder="Address"
            value={account.address}
            onChange={(e) => setAccount({ ...account, address: e.target.value })}
          />
          <select
            className={styles.select}
            value={account.role}
            onChange={(e) => setAccount({ ...account, role: e.target.value })}
          >
            <option value="">Select an option</option>
            <option value="ADMIN">ADMIN</option>
            <option value="MEDICAL_DEPARTMENT">MEDICAL DEPARTMENT</option>
          </select>
          <button className={styles.button} type="submit">
            Create
          </button>
        </form>
        <div className={styles.signupText}>
          You already have an account?{" "}
          <a className={styles.link} href="/login">
            sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
