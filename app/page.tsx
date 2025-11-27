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
        <><button
        style={{ borderColor: "#957139", fontWeight: "bold", borderWidth: "thin", color: "#957139" }}
        className="fixed top-4 right-4 px-4 py-2 rounded-full shadow flex items-center gap-2"
        onClick={() => console.log("Button clicked")}
      >
        <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg> New Note
      </button>
    <br/><br/>
  <main className="flex h-screen">
        <aside className="w-64 p-10">
          <CategoryList categories={categories} />
        </aside>

        {notes.length > 0 && (
  <div className="flex justify-end items-start flex-1 relative">
    <section
      className="
        overflow-auto
        mt-20  
        mr-5              
        rounded-xl
      "
    >
          
          <NotesList notes={notes} categories={categories} onDelete={deleteNote} />
          </section>
  </div>
)}
      </main>
      
      </>


  );
}
