import { useState } from "react";
import TopBar from "../components/Home/TopBar";
import AddNote from "../components/Home/AddNote";
import NoteList from "../components/Home/NoteList";
import Header from "../components/Home/Header"; // Correct import
import { getAuth } from "firebase/auth"; // Import Firebase authentication

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser; // Get the authenticated user

  const refreshNotes = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <h1>Welcome to Home!</h1>
      <TopBar />
      <NoteList refresh={refresh} />
      <AddNote onNoteAdded={refreshNotes} />
      <Header user={user} notesCount={10} />
    </div>
  );
};

export default Home;
