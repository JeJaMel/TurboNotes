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

  const [selectedNote, setSelectedNote] = useState(null);
  const [modalType, setModalType] = useState(""); // "read" or "edit"

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

  const openModal = (note, type) => {
    setSelectedNote(note);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedNote(null);
    setModalType("");
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        loading,
        query,
        setQuery,
        selectedNote,
        modalType,
        openModal,
        closeModal,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

NotesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
