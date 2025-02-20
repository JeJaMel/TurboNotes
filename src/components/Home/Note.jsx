import { useState } from "react";
import { db } from "../../firebase/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import styles from "../../css/Home/Note.module.css";
import propTypes from "prop-types";

const Note = ({ note, setNotes }) => {
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(note.title);
  const [updatedContent, setUpdatedContent] = useState(note.content);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    try {
      const noteRef = doc(db, "users", note.userId, "notes", note.id);
      await deleteDoc(noteRef);

      // Remove the note from the state dynamically
      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
      alert("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const noteRef = doc(db, "users", note.userId, "notes", note.id);
      await updateDoc(noteRef, {
        title: updatedTitle,
        content: updatedContent,
      });

      // Update the note in the state
      setNote