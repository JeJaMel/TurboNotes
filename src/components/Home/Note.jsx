import { useState } from "react";
import { db } from "../../firebase/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import styles from "../../css/Home/Note.module.css";
import propTypes from "prop-types";

const Note = ({ note, setNotes }) => {
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedContent, setUpdatedContent] = useState(note.content);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    try {
      const noteRef = doc(db, "users", note.userId, "notes", note.id);
      await deleteDoc(noteRef);

      // Remove the note from the state dynamically
      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
      alert("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const noteRef = doc(db, "users", note.userId, "notes", note.id);
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

      setIsEditMode(false);
      alert("Note updated successfully!");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className={styles.noteContainer}>
      <h3 className={styles.noteTitle}>{note.title}</h3>
      <div className={styles.noteOptions}>
        <button
          className={styles.readButton}
          onClick={() => setIsReadModalOpen(true)}
        >
          Read
        </button>
        <button
          className={styles.editButton}
          onClick={() => setIsEditMode(true)}
        >
          Edit
        </button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>
      </div>

      {isReadModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => setIsReadModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {isEditMode && (
        <div className={styles.editForm}>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            placeholder="Edit title"
          />
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            placeholder="Edit content"
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditMode(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

Note.propTypes = {
  note: propTypes.object.isRequired,
  setNotes: propTypes.func.isRequired,
};

export default Note;
