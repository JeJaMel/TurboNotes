import PropTypes from "prop-types";
import styles from "../../css/Auth/Auth.module.css";

const AuthToggle = ({
  showRegister,
  showForgotPassword,
  toggleRegister,
  toggleForgotPassword,
  goBack,
}) => {
  if (showRegister || showForgotPassword) {
    return (
      <div className={styles.authToggleContainer}>
        <div className={styles.authToggle} onClick={goBack}>
          Go back
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authToggleContainer}>
      <div className={styles.authToggle} onClick={toggleForgotPassword}>
        Forgot your password?
      </div>
      <div className={styles.authToggle} onClick={toggleRegister}>
        {showRegister
          ? "Already have an account?"
          : "You don't have an account?"}
      </div>
    </div>
  );
};

AuthToggle.propTypes = {
  showRegister: PropTypes.bool.isRequired,
  showForgotPassword: PropTypes.bool.isRequired,
  toggleRegister: PropTypes.func.isRequired,
  toggleForgotPassword: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default AuthToggle;
