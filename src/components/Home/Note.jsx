import { useNotes } from "../../context/UseNotes";
import { db, auth } from "../../firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import styles from "../../css/Home/Note.module.css";
import propTypes from "prop-types";
import { FiBookOpen, FiEdit2, FiTrash2 } from "react-icons/fi";

const Note = ({ note }) => {
  const { openModal, setNotes } = useNotes();
  const { title, content, showEditButton = true } = note;

  const handleDelete = async () => {
    if (!note.id) return;
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const noteRef = doc(db, "users", userId, "notes", note.id);
      await deleteDoc(noteRef);

      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className={styles.noteContainer}>
      <h3 className={styles.noteTitle}>{title}</h3>
      <p className={styles.noteContent}>{content}</p>
      <div className={styles.noteOptions}>
        <button
          className={styles.readButton}
          onClick={() => openModal(note, "read")}
        >
          <FiBookOpen />
        </button>
        {showEditButton && (
          <button
            className={styles.editButton}
            onClick={() => openModal(note, "edit")}
          >
            <FiEdit2 />
          </button>
        )}
        <button className={styles.deleteButton} onClick={handleDelete}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

Note.propTypes = {
  note: propTypes.object.isRequired,
  showEditButton: propTypes.bool,
};

export default Note;
