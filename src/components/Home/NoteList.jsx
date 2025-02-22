import { useNotes } from "../../context/UseNotes";
import Note from "./Note";
import ReadNote from "./ReadNote";
import EditNote from "./EditNote";
import Wait from "../Home/Wait";
import styles from "../../css/Home/NoteList.module.css";
import { FiFrown } from "react-icons/fi";

const NoteList = () => {
  const {
    notes,
    selectedNote,
    modalType,
    closeModal,
    query,
    loading,
    setNotes,
  } = useNotes();

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.noteListContainer}>
      {loading ? (
        <Wait />
      ) : filteredNotes.length > 0 ? (
        filteredNotes.map((note) => (
          <Note key={note.id} note={note} setNotes={setNotes} />
        ))
      ) : (
        <div className={styles.notFoundContainer}>
          <p className={styles.errorMatchMessage}>
            {" "}
            No matching notes found <FiFrown />
          </p>
        </div>
      )}

      {/* Global modal rendering */}
      {selectedNote && modalType === "read" && (
        <ReadNote note={selectedNote} onClose={closeModal} />
      )}

      {selectedNote && modalType === "edit" && (
        <EditNote note={selectedNote} onClose={closeModal} />
      )}
    </div>
  );
};

export default NoteList;
