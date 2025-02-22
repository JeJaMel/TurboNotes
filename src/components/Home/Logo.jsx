import PropTypes from "prop-types";
import styles from "../../css/Home/Logo.module.css";

const Logo = ({ text }) => {
  return (
    <div className={styles.logoContainer}>
      <h2 className={styles.logoText}>{text}</h2>
    </div>
  );
};

Logo.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Logo;
