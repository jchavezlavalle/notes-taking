"use client";

import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import { Note } from "./types/Note";
import {Category} from "./types/Category";
import generateDefaultCategories from "./utils/generateDefaultCategories";
import CategoryList from "./components/CategoryList";

export default function Home() {
  const [categories,setCategories] = useState<Category[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  // Loads from storage on first render
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch {
        console.error("Invalid localStorage data for saved notes");
      }
    }   
  }, []);

  // Save notes to localStorage when changed
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const saved = localStorage.getItem("categories");
  
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCategories(parsed);
        return; // STOP HERE
      } catch (e) {
        console.error("Stored categories invalid:", e);
      }
    }
  
    const generated = generateDefaultCategories();
    localStorage.setItem("categories", JSON.stringify(generated));
    setCategories(generated);
  }, []);

  const addNote = (note: Note) => {
    setNotes((prev) => [note, ...prev]);
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };


  return (
    <main className="flex h-screen">
  {/* Left sidebar */}
  <aside className="w-64 p-4">
    <CategoryList categories={categories} />
  </aside>

  {/* Main content */}
  <section className="flex-1 p-6 overflow-auto">
    <NoteForm onAdd={addNote}/>
    <NotesList notes={notes} categories={categories} onDelete={deleteNote} />
  </section>
</main>

  );
}
