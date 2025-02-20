import { createContext, useEffect, useState } from "react";
import {
  db,
  collection,
  onSnapshot,
  auth,
  onAuthStateChanged,
} from "../firebase/firebase";
import PropTypes from "prop-types";

const NotesContext = createContext();
export default NotesContext;

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

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

  return (
    <NotesContext.Provider
      value={{ notes, setNotes, loading, query, setQuery }}
    >
      {children}
    </NotesContext.Provider>
  );
};

NotesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
