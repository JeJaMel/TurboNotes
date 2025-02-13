import { useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ForgotPassword from "../components/Auth/ForgotPassword";
import GoogleLogin from "../components/Auth/GoogleLogin";
import AuthToggle from "../components/Auth/AuthToggle";
import styles from "../css/Auth.module.css";
import logo from "../assets/Logo1.png"; // Import the logo image

const Auth = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const toggleRegister = () => {
    setShowRegister(!showRegister);
    setShowForgotPassword(false); // Ensure Forgot Password is hidden
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setShowRegister(false); // Ensure Register is hidden
  };

  const goBack = () => {
    setShowRegister(false);
    setShowForgotPassword(false);
  };

  return (
    <div className={styles.authContainer}>
      <img src={logo} alt="TurboNotes Logo" className={styles.authLogo} />
      <div className={styles.authForm}>
        {!showRegister && !showForgotPassword && <Login />}
        {!showRegister && !showForgotPassword && (
          <GoogleLogin buttonText="Sign in with Google" />
        )}
        <AuthToggle
          showRegister={showRegister}
          showForgotPassword={showForgotPassword}
          toggleRegister={toggleRegister}
          toggleForgotPassword={toggleForgotPassword}
          goBack={goBack}
        />
      </div>
      {showForgotPassword && (
        <div className={styles.authForm}>
          <ForgotPassword />
        </div>
      )}
      {showRegister && (
        <div className={styles.authForm}>
          <Register />
          <GoogleLogin buttonText="Register with Google" />
        </div>
      )}
    </div>
  );
};

export default Auth;
