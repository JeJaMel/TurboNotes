import styles from "../../css/Home/ReadNote.module.css";
import propTypes from "prop-types";

const ReadNote = ({ note, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>{note.title}</h3>
        <p className={styles.modalContentText}>{note.content}</p>
        <button className={styles.modalButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

ReadNote.propTypes = {
  note: propTypes.object.isRequired,
  onClose: propTypes.func.isRequired,
};

export default ReadNote;
