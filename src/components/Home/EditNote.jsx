import styles from "../../css/Home/EditNote.module.css";
import { useNotes } from "../../context/UseNotes";
import propTypes from "prop-types";
import { useState } from "react";
import { db, auth } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

const EditNote = ({ note }) => {
  const { closeModal, setNotes } = useNotes();
  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedContent, setUpdatedContent] = useState(note.content);

  const handleEdit = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const noteRef = doc(db, "users", userId, "notes", note.id);
      await updateDoc(noteRef, {
        title: updatedTitle,
        content: updatedContent,
      });

      setNotes((prevNotes) =>
        prevNotes.map((n) =>
          n.id === note.id
            ? { ...n, title: updatedTitle, content: updatedContent }
            : n
        )
      );

      closeModal();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>Edit Note</h3>
        <input
          type="text"
          className={styles.inputTitle}
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <textarea
          className={styles.textareaContent}
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
        />
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleEdit}>
            Save
          </button>
          <button className={styles.button} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

EditNote.propTypes = {
  note: propTypes.object.isRequired,
};

export default EditNote;
