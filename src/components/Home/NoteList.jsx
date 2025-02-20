import { useEffect, useState } from "react";
import {
  auth,
  onAuthStateChanged,
  db,
  collection,
  onSnapshot,
} from "../../firebase/firebase";
import Note from "./Note";
import styles from "../../css/Home/NoteList.module.css";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeAuth;
    let unsubscribeSnapshot;

    unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const notesRef = collection(db, "users", user.uid, "notes");

        // Subscribe to real-time updates
        unsubscribeSnapshot = onSnapshot(notesRef, (snapshot) => {
          const notesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            userId: user.uid, // Needed for deleting notes
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

    // Cleanup subscriptions on unmount
    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  return (
    <div className={styles.noteListContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : notes.length > 0 ? (
        notes.map((note) => (
          <Note key={note.id} note={note} setNotes={setNotes} />
        ))
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
};

export default NoteList;
