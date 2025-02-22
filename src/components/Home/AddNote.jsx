import { useState } from "react";
import { db, collection, addDoc } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import styles from "../../css/Home/AddNote.module.css";
import pencilPlusIcon from "../../assets/pencil-plus.svg";
import { FiSave, FiXCircle } from "react-icons/fi";

const AddNote = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and content are required!");

    try {
      setLoading(true);
      const user = auth.currentUser;
      console.log("Current user:", user);
      if (!user) {
        alert("You need to be logged in!");
        return;
      }

      // Reference to Firestore collection
      const notesRef = collection(db, "users", user.uid, "notes");

      // Add note to Firestore
      await addDoc(notesRef, {
        title,
        content,
        showEditButton,
        createdAt: new Date().toISOString(),
      });

      setIsOpen(false);
      setTitle("");
      setContent("");
      setShowEditButton(false);
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.addNoteContainer}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.addButton}>
        <img src={pencilPlusIcon} alt="Add Note" />
      </button>

      {isOpen && (
        <div className={styles.addNoteFormContainer}>
          <div className={styles.goBackSVG} onClick={handleGoBack}>
            <FiXCircle />
          </div>

          <div className={styles.titleContainer}>
            <h2>Add a new note!</h2>
          </div>
          <div className={styles.addNoteForm}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={showEditButton}
                onChange={(e) => setShowEditButton(e.target.checked)}
              />
              Show Edit Button
            </label>
            <button
              onClick={handleAddNote}
              className={styles.saveButton}
              disabled={loading}
            >
              {loading ? "Saving..." : <FiSave />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNote;
