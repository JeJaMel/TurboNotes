import { useState, useEffect } from "react";
import TopBar from "../components/Home/TopBar";
import AddNote from "../components/Home/AddNote";
import NoteList from "../components/Home/NoteList";
import Header from "../components/Home/UserButton";
import { getAuth } from "firebase/auth";
import { db, collection, onSnapshot } from "../firebase/firebase";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const [notesCount, setNotesCount] = useState(0);
  const auth = getAuth();
  const user = auth.currentUser;

  const refreshNotes = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    if (user) {
      const notesRef = collection(db, "users", user.uid, "notes");
      const unsubscribe = onSnapshot(notesRef, (snapshot) => {
        setNotesCount(snapshot.size); // Updates the count 
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div>
      <h1>Welcome to Home!</h1>
      <TopBar />
      <NoteList refresh={refresh} />
      <AddNote onNoteAdded={refreshNotes} />
      <Header user={user} notesCount={notesCount} />
    </div>
  );
};

export default Home;
