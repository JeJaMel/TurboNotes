import styles from "../../css/Home/TopBar.module.css";
import Logout from "../Home/Logout";
import SearchBar from "../Home/SearchBar";
import Logo from "../Home/Logo";

const TopBar = () => {
  return (
    <div className={styles.topBarContainer}>
      <Logo text="TurboNotes" />
      <SearchBar />
      <Logout />
    </div>
  );
};

export default TopBar;
