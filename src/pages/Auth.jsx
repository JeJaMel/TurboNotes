import { useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ForgotPassword from "../components/Auth/ForgotPassword";
import GoogleLogin from "../components/Auth/GoogleLogin";
import AuthToggle from "../components/Auth/AuthToggle";
import styles from "../css/Auth/Auth.module.css";
import logo from "../assets/Logo1.png";

const Auth = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const toggleRegister = () => {
    setShowRegister(!showRegister);
    setShowForgotPassword(false);
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setShowRegister(false);
  };

  const goBack = () => {
    setShowRegister(false);
    setShowForgotPassword(false);
  };

  return (
    <div className={styles.authContainer}>
      <img src={logo} alt="TurboNotes Logo" className={styles.authLogo} />

      {!showRegister && !showForgotPassword && (
        <div className={styles.authForm}>
          <Login />
          <div className={styles.googleLoginButton}>
            <GoogleLogin buttonText="Sign in with Google" />
          </div>
          <AuthToggle
            showRegister={showRegister}
            showForgotPassword={showForgotPassword}
            toggleRegister={toggleRegister}
            toggleForgotPassword={toggleForgotPassword}
            goBack={goBack}
          />
        </div>
      )}

      {showForgotPassword && (
        <div className={styles.authForm}>
          <ForgotPassword />
          <AuthToggle
            showRegister={showRegister}
            showForgotPassword={showForgotPassword}
            toggleRegister={toggleRegister}
            toggleForgotPassword={toggleForgotPassword}
            goBack={goBack}
          />
        </div>
      )}

      {showRegister && (
        <div className={styles.authForm}>
          <Register />
          <div className={styles.googleLoginButton}>
            <GoogleLogin buttonText="Register with Google" />
          </div>
          <AuthToggle
            showRegister={showRegister}
            showForgotPassword={showForgotPassword}
            toggleRegister={toggleRegister}
            toggleForgotPassword={toggleForgotPassword}
            goBack={goBack}
          />
        </div>
      )}
    </div>
  );
};


export default Auth;
