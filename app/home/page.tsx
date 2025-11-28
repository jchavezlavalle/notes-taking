"use client";

import { useEffect, useState } from "react";
import NoteForm from "../components/NoteForm";
import NotesList from "../components/NotesList";
import { Note } from "../types/Note";
import {Category} from "../types/Category";
import generateDefaultCategories from "../utils/generateDummyData";
import CategoryList from "../components/CategoryList";
import "./globals.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [categories,setCategories] = useState<Category[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/");
    }
  }, []);

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

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const saved = localStorage.getItem("categories");
  
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCategories(parsed);
        return; 
      } catch (e) {
        console.error("Stored categories invalid:", e);
      }
    }
  
    const generated = generateDefaultCategories();
    localStorage.setItem("categories", JSON.stringify(generated));
    setCategories(generated);
  }, []);

  const onCloseModal = () => {
    setIsModalOpen(false);
  }

  const createNewNote = () => {
    setIsModalOpen(true);
  };

  const addNote = (note: Note) => {
    setNotes((prev) => [note, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const onCategoryChange = (id: number)=> {
    setSelectedCategory(id);
  }

  return (
        <><button
        style={{ borderColor: "#957139", fontWeight: "bold", borderWidth: "thin", color: "#957139" }}
        className="fixed top-4 right-4 px-4 py-2 rounded-full shadow flex items-center gap-2"
        onClick={() => createNewNote()}
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

      {isModalOpen && (
  <div className="modal-background fixed inset-0 flex items-center justify-center z-50">
    <div className="p-10 w-full h-full shadow-xl relative">
      <NoteForm 
      categories={categories}
        onAdd={(note) => {
          addNote(note);
          setIsModalOpen(false); // Close after creating
        }}
        onCloseModal={onCloseModal}
      />
    </div>
  </div>
)}
    <br/><br/>
  <main className="flex h-screen">
        <aside className="w-[300px] p-10">
          <CategoryList categories={categories} onSelectedCategory={onCategoryChange}/>
        </aside>

        {notes.length > 0 && (
  <div className="flex items-start relative">
<section className="flex-1 overflow-auto mt-20 pr-10">
  <div className="w-full h-full flex justify-end">
    <NotesList
      notes={notes}
      categories={categories}
      onDelete={deleteNote}
      selectedCategory={selectedCategory}
    />
  </div>
</section>
  </div>
)}
      </main>
      
      </>


  );
}
