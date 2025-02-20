import styles from "../../css/Home/NoteList.module.css";
import Note from "./Note";
import Wait from "../Home/Wait";
import { useNotes } from "../../context/useNotes"; 

const NoteList = () => {
  const { notes, setNotes, loading, query } = useNotes();

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
        <p>No matching notes found</p>
      )}
    </div>
  );
};

export default NoteList;
