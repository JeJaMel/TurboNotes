import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "../../css/Login.module.css";
import SuccessCheckmark from "../Auth/SuccesCheckmark";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessCheckmark, setShowSuccessCheckmark] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Logged in as:", userCredential.user.email);

      setShowSuccessCheckmark(true);

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect! Please try again.");
          break;
        default:
          setError("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}

      {showSuccessCheckmark ? (
        <SuccessCheckmark onAnimationEnd={() => navigate("/home")} />
      ) : (
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <input
            type="email"
            className={styles.inputField}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.inputField}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
