import PropTypes from "prop-types";
import styles from "../../css/Auth.module.css";

const AuthToggle = ({
  showRegister,
  showForgotPassword,
  toggleRegister,
  toggleForgotPassword,
  goBack,
}) => {
  return (
    <div>
      {!showRegister && !showForgotPassword && (
        <div className={styles.authToggle} onClick={toggleForgotPassword}>
          Forgot your password?
        </div>
      )}
      {!showRegister && !showForgotPassword && (
        <div className={styles.authToggle} onClick={toggleRegister}>
          {showRegister
            ? "Already have an account?"
            : "You don't have an account?"}
        </div>
      )}
      {(showRegister || showForgotPassword) && (
        <div className={styles.authToggle} onClick={goBack}>
          Go back
        </div>
      )}
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
