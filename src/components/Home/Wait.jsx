import styles from "../../css/Home/Wait.module.css";

export default function Wait() {
  return (
    <div className={styles.waitOverlay}>
      <img
        src="./Spin2.svg"
        alt="Loading spinner"
        className={styles.waitSpinner}
      />
    </div>
  );
}
