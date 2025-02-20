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
import Header from "./Header"; // Import the Header component

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeAuth;
    let unsubscribeSnapshot;

    unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Save user info to state

        const notesRef = collection(db, "users", user.uid, "notes");
        // Subscribe to real-time updates
        unsubscribeSnapshot = onSnapshot(notesRef, (snapshot) => {
          const notesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            userId: user.uid,
            ...doc.data(),
          }));
          setNotes(notesData);
          setLoading(false);
        });
      } else {
        setNotes([]);
        setLoading(false);
        setUser(null);
      }
    });

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  return (
    <div className={styles.noteListContainer}>
      {/* Include the Header component with user and notes count */}
      {user && <Header user={user} notesCount={notes.length} />}

      {/* Show notes */}
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
