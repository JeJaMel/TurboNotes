import styles from "../../css/Home/TopBar.module.css";
import Logout from "../Home/Logout";
 import SearchBar from "../Home/SearchBar";

const TopBar = () => {
 
  return (
    <div className={styles.topBarContainer}>
      <h2 className={styles.logo}>TurboNotes</h2>
      <SearchBar />
      <Logout />
        

    </div>
  );
};

export default TopBar;
