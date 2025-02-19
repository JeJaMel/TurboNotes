import styles from "../../css/Home/TopBar.module.css";
import Logout from "../Home/Logout";

const TopBar = () => {
 
  return (
    <div className={styles.topBarContainer}>
      
      <Logout />

    </div>
  );
};

export default TopBar;
