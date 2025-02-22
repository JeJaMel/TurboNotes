import { useState, useEffect, useContext } from "react";
import UserInfo from "./UserInfo";
import styles from "../../css/Home/UserButton.module.css";
import inputTypes from "prop-types";
import { FiUser } from "react-icons/fi";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NotesContext from "../../context/NotesContext";

const Header = () => {
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { notes } = useContext(NotesContext);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.header}>
      <button
        className={styles.userInfoButton}
        onClick={() => setIsUserInfoModalOpen(true)}
      >
        <FiUser />
      </button>

      {isUserInfoModalOpen && user && (
        <UserInfo
          user={user}
          notesCount={notes.length}
          closeModal={() => setIsUserInfoModalOpen(false)}
        />
      )}
    </div>
  );
};

Header.propTypes = {
  notesCount: inputTypes.number.isRequired,
};

export default Header;
