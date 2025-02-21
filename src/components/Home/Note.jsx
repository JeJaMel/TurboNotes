import { useState } from "react";
import { db, auth } from "../../firebase/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import styles from "../../css/Home/Note.module.css";
import propTypes from "prop-types";
import { FiBookOpen, FiEdit2, FiTrash2 } from "react-icons/fi";

const Note = ({ note, setNotes }) => {
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedContent, setUpdatedContent] = useState(note.content);

  const handleDelete = async () => {
    console.log("Deleting note with ID:", note.id);

    if (!note.id) {
      console.error("Note ID is missing!");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("User ID is missing!");
        return;
      }

      const noteRef = doc(db, "users", userId, "notes", note.id);
      console.log("Deleting from Firestore:", noteRef.path);

      await deleteDoc(noteRef);

      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));

      console.log("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("User ID is missing!");
        return;
      }

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

      setIsEditMode(false);
      alert("Note updated successfully!");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className={styles.noteContainer}>
      <h3 className={styles.noteTitle}>{note.title}</h3>

      <p className={styles.noteContent}>
        {note.content.length > 150
          ? `${note.content.slice(0, 150)}...`
          : note.content}
      </p>

      <div className={styles.noteOptions}>
        <button
          className={styles.readButton}
          onClick={() => {
            setIsReadModalOpen(true);
          }}
        >
          <FiBookOpen />
        </button>
        <button
          className={styles.editButton}
          onClick={() => setIsEditMode(true)}
        >
          <FiEdit2 />
        </button>
        <button className={styles.deleteButton} onClick={handleDelete}>
          <FiTrash2 />
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
