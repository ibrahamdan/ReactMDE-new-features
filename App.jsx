import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { onSnapshot, doc, addDoc, setDoc, deleteDoc, query, orderBy } from "firebase/firestore"
import { notesCollection, db } from "./firebase"

export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    
    const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]

    React.useEffect(() => {
        const notesQuery = query(notesCollection, orderBy("updatedAt", "desc"))
        const unsub = onSnapshot(notesQuery, (snapshot) => {
            const notesArr = snapshot.docs.map((doc) => (
                {
                    ...doc.data(),
                    id: doc.id,
                }
            ))
            setNotes(notesArr)
        })
        return () => unsub
    }, [])

    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }

    function updateNote(text) {
        const docRef = doc(db, "notes", currentNoteId)
        const updatedAt = new Date()
        setDoc(docRef, { body: text, updatedAt: updatedAt }, { merge: true })
    }

    async function deleteNote(event, noteId) {
        event.stopPropagation()
        const docRef = doc(db, "notes", noteId)
        await deleteDoc(docRef)
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={notes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        {
                            <Editor
                                currentNote={currentNote}
                                updateNote={updateNote}
                            />
                        }
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                </button>
                    </div>

            }
        </main>
    )
}
