import { useState } from "react";
import TopBar from "../components/Home/TopBar";
import AddNote from "../components/Home/AddNote";
import NoteList from "../components/Home/NoteList";

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshNotes = () => {
    setRefresh((prev) => !prev); 
  };

  return (
    <div>
      <h1>Welcome to Home!</h1>
      <TopBar />
      <NoteList refresh={refresh} />
      <AddNote onNoteAdded={refreshNotes} />
    </div>
  );
};

export default Home;
