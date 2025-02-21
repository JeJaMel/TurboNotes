import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styles from "../../css/Auth/ForgotPassword.module.css"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        default:
          setError("Failed to send reset email. Please try again.");
      }
    }
  };


  return (
    <div className={styles.forgotContainer}>
      <h2 className={styles.forgotTitle}>Forgot Password</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {message && <p className={styles.successMessage}>{message}</p>}
      <form className={styles.forgotForm} onSubmit={handleReset}>
        <input
          type="email"
          className={styles.inputField}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className={styles.forgotButton}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
