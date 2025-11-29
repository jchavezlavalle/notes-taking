"use client";

import { useEffect, useState } from "react";
import NoteForm from "../components/NoteForm";
import NotesList from "../components/NotesList";
import { Note } from "../types/Note";
import {Category} from "../types/Category";
import generateDefaultCategories from "../utils/generateDummyData";
import CategoryList from "../components/CategoryList";
import "../globals.css";
import { useRouter } from "next/navigation";
import { config } from "../config";
import { getAllCategoriesAPI, getNotesCountFromCategories } from "../services/categoriesApi";
import { getAllNotes } from "../services/notesApi";
import { NotesCount } from "../types/NotesCount";

export default function Home() {
  const [categories,setCategories] = useState<Category[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note| undefined>();
  const [notesCount, setNotesCount] = useState<NotesCount[]>([]);

  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    async function loadNotesCount() {
      try {
        const data = await getNotesCountFromCategories();
        setNotesCount(data.data);
        localStorage.setItem("countNotes", JSON.stringify(data.data));
      } catch (e) {
        console.error("Failed to fetch notes from backend", e);
      }
    }
    loadNotesCount();
  }, []);


  useEffect(() => {
    async function loadNotes() {
      const saved = localStorage.getItem("notes");
  
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setNotes(parsed);
        } catch {
          console.error("Invalid localStorage notes");
        }
      }
  
      try {
        const data = await getAllNotes();
        setNotes(data);
        localStorage.setItem("notes", JSON.stringify(data));
      } catch (e) {
        console.error("Failed to fetch notes from backend", e);
      }
    }
  
    loadNotes();
  }, []);

  useEffect(() => {
    async function loadCategories() {
      const saved = localStorage.getItem("categories");
  
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setCategories(parsed);
        } catch {
          console.error("Invalid localStorage categories");
        }
      }
  
      try {
        const data = await getAllCategoriesAPI();
        setCategories(data);
        localStorage.setItem("categories", JSON.stringify(data));
      } catch (e) {
        console.error("Failed to fetch categories from backend", e);
      }
    }
  
    loadCategories();
  }, []);

  const selectNote = (n: Note) => {
    setSelectedNote(n);
    setIsModalOpen(true);
  }

  const onCloseModal = () => {
    setSelectedCategory(0);
    setSelectedNote(undefined);
    setIsModalOpen(false);
  }

  const createNewNote = () => {
    setIsModalOpen(true);
  };

  const addNote = (note: Note) => {
    setNotes((prev) => [note, ...prev]);
  };

  const editNote = (updatedNote: Note) => {
    setNotes(prevNotes =>
      prevNotes.map(n =>
        n.id === updatedNote.id ? updatedNote : n
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const onCategoryChange = (id: number)=> {
    setSelectedCategory(id);
  }

  const emptyNotesDashboard = (!notes || notes.length === 0);

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
      selectedNote={selectedNote}
      categories={categories}
        onAdd={(note) => {
          addNote(note);
          setIsModalOpen(false); // close the modal after creating note
        }}
        onEditNote = {(note) => {
            editNote(note);
            setIsModalOpen(false);
        }}
        onCloseModal={onCloseModal}
      />
    </div>
  </div>
)}
    <br/><br/>
  <main className="flex h-screen">
        <aside className="w-[300px] p-10">
          <CategoryList categories={categories} notesCount={notesCount} onSelectedCategory={onCategoryChange}/>
        </aside>

        {emptyNotesDashboard && (
            <div className={"flex flex-col items-center h-full m-auto"}>
                <img 
    src="/wait_coffee.png" 
    alt="welcome back image"
    className="w-300 h-300"
  />
  <div style={{color: "#88642A", fontSize: "20px"}}>{config.message_when_no_notes || "No notes found"}</div>
  </div>
        )}

        {notes.length > 0 && (
  <div className="flex items-start relative">
<section className="flex-1 overflow-auto mt-20 pr-10">
  <div className="w-full h-full flex justify-end">
    <NotesList
      notes={notes}
      categories={categories}
      onDelete={deleteNote}
      selectedCategory={selectedCategory}
      onNoteSelected={selectNote}
    />
  </div>
</section>
  </div>
)}
      </main>
      
      </>


  );
}
