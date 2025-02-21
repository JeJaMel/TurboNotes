import { useEffect, useState } from "react";
import styles from "../../css/Auth/SuccessCheckmark.module.css";
import PropTypes from "prop-types";

const SuccessCheckmark = ({ onAnimationEnd }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onAnimationEnd) onAnimationEnd();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return show ? (
    <div className={styles.successCheckmark}>
      <div className={styles.checkIcon}>
        <span className={`${styles.iconLine} ${styles.lineTip}`}></span>
        <span className={`${styles.iconLine} ${styles.lineLong}`}></span>
        <div className={styles.iconCircle}></div>
        <div className={styles.iconFix}></div>
      </div>
    </div>
  ) : null;
};

SuccessCheckmark.propTypes = {
  onAnimationEnd: PropTypes.func,
};

export default SuccessCheckmark;
