import { useState } from "react";
import styles from "./login.module.css";
import { authenticateUser } from "../../services/utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: any) => {
    event.preventDefault();

    if (username === "" || password === "") {
      alert("Please fill all the fields correctly.");
      return;
    }

    const response = await authenticateUser(username, password);
    if (response.status === 200) {
      console.log("Login successful", response.data);
      window.location.href = "/dashboard";
      // Redirect to the dashboard
    } else {
      console.error("Login failed:", response.data);
      alert("Invalid credentials. Please try again.");
    }
    console.log(response.data);

    console.log("Login attempt with:", username, password);
  };

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
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.button} type="submit">
            Login
          </button>
        </form>
        <div className={styles.signupText}>
          You do not have an account?{" "}
          <a className={styles.link} href="/signup">
            sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;