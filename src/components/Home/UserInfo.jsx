import { useState } from "react";
import { auth } from "../../firebase/firebase";
import styles from "../../css/Home/UserInfo.module.css";
import propTypes from "prop-types";

const UserInfo = ({ user, notesCount, closeModal }) => {
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    try {
      await auth.currentUser.updatePassword(newPassword);
      alert("Password updated successfully!");
      setNewPassword("");
      setPasswordError(""); 
    } catch (error) {
      console.error("Error changing password:", error);
      setPasswordError("Failed to update password.");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>User Information</h3>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Notes Created:</strong> {notesCount}
        </p>

        <div className={styles.changePasswordSection}>
          <h4>Change Password</h4>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <button onClick={handleChangePassword}>Update Password</button>
          {passwordError && <p className={styles.error}>{passwordError}</p>}
        </div>

        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  user: propTypes.object.isRequired,
  notesCount: propTypes.number.isRequired,
  closeModal: propTypes.func.isRequired,
};

export default UserInfo;
