import Sidebar from "./Components/Sider";
import Editor from "./Components/Editor";
import Split from "react-split";
import "./index.css";
import React from "react";
import { addDoc, onSnapshot, doc, deleteDoc, setDoc } from "firebase/firestore";
import { notesCollection, db } from "./Firebase";

export default function App() {
  const [notes, setNotes] = React.useState([]);
  const [currentNoteId, setCurrentNoteId] = React.useState("");

  const [tempNoteText, setTempNoteText] = React.useState("");

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  const sortArr = notes.sort((a, b) => b.updateAt - a.updateAt);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote]);

  React.useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tempNoteText !== currentNote.body) {
        updateNote(tempNoteText);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [tempNoteText]);
  <img src="4021693.png" alt="logo" width={100} height={100} />;
  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown notes title here",
      createdAt: Date.now(),
      updateAt: Date.now(),
    };

    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  async function updateNote(text) {
    const docref = doc(db, "notes", currentNoteId);
    await setDoc(docref, { body: text, updateAt: Date.now() }, { merge: true });
  }

  async function deleteNote(noteId) {
    const docref = doc(db, "notes", noteId);
    await deleteDoc(docref);
  }
  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={sortArr}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          <Editor
            tempNoteText={tempNoteText}
            setTempNoteText={setTempNoteText}
          />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
