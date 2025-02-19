import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "../../css/Register.module.css";
import SuccessCheckmark from "../Auth/SuccesCheckmark";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessCheckmark, setShowSuccessCheckmark] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowSuccessCheckmark(true); // Show checkmark animation

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters long.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        default:
          setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.registerTitle}>Register</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}

      {showSuccessCheckmark ? (
        <SuccessCheckmark onAnimationEnd={() => navigate("/home")} />
      ) : (
        <form className={styles.registerForm} onSubmit={handleRegister}>
          <input
            type="email"
            className={styles.inputField}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.inputField}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;
