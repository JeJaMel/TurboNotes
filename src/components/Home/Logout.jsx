import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import styles from "../../css/Home/Logout.module.css";
import { BiPowerOff } from "react-icons/bi";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out!");
      navigate("/auth");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div className={styles.logoutButtonContainer}>
      <button className={styles.logoutButton} onClick={handleLogout}>
        <BiPowerOff className={styles.logoutIcon} />
        <span className={styles.logoutTitle}>Logout</span>
      </button>
    </div>
  );
};

export default Logout;
