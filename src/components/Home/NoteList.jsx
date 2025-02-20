import { useEffect, useState } from "react";
import {
  db,
  collection,
  onSnapshot,
  auth,
  onAuthStateChanged,
} from "../../firebase/firebase";
import SearchBar from "./SearchBar";
import Note from "./Note";
import Wait from "../Home/Wait";
import styles from "../../css/Home/NoteList.module.css";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(""); // Search query state

  useEffect(() => {
    let unsubscribeSnapshot;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const notesRef = collection(db, "users", user.uid, "notes");
        unsubscribeSnapshot = onSnapshot(notesRef, (snapshot) => {
          const notesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotes(notesData);
          setLoading(false);
        });
      } else {
        setNotes([]);
        setLoading(false);
      }
    });

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  // Filter notes based on title
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.noteListContainer}>
      <SearchBar onSearch={setQuery} />

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
