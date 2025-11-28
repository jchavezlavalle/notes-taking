import { Note } from "../types/Note";

export async function createNoteAPI(note: Note) {
    const res = await fetch("http://localhost:8000/api/notes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
  
    if (!res.ok) throw new Error("Failed to create note");
    return res.json();
  }

  export async function updateNoteAPI(note: Note) {
    const res = await fetch(`http://localhost:8000/api/notes/${note.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
  
    if (!res.ok) throw new Error("Failed to update note");
    return res.json();
  }

  export async function getAllNotes() {
    const res = await fetch(`http://localhost:8000/api/notes/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  
    if (!res.ok) throw new Error("Failed to get all notes");
    return res.json();
  }

  export async function getNotesByCategoryId(categoryId: number) {
    const res = await fetch(`http://localhost:8000/api/notes/?categoryId=${categoryId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  
    if (!res.ok) throw new Error("Failed to get notes by categoryId");
    return res.json();
  }

  