import styles from "../../css/Home/ReadNote.module.css";
import propTypes from "prop-types";

const ReadNote = ({ note, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

ReadNote.propTypes = {
  note: propTypes.object.isRequired,
  onClose: propTypes.func.isRequired,
};

export default ReadNote;
