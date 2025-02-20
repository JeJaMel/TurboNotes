import { useState } from "react";
import UserInfo from "./UserInfo";
import styles from "../../css/Home/UserButton.module.css";
import inputTypes from "prop-types";

const Header = ({ user, notesCount }) => {
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);

  return (
    <div className={styles.header}>
      <button
        className={styles.userInfoButton}
        onClick={() => setIsUserInfoModalOpen(true)}
      >
        User Info
      </button>

      {isUserInfoModalOpen && user && (
        <UserInfo
          user={user}
          notesCount={notesCount}
          closeModal={() => setIsUserInfoModalOpen(false)}
        />
      )}
    </div>
  );
};

Header.propTypes = {
    user: inputTypes.object.isRequired,
    notesCount: inputTypes.number.isRequired,
    };

export default Header;
