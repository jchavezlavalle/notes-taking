"use client";

import { useState } from "react";
import { Note } from "../types/Note";
import { config } from "../config";
import { Category } from "../types/Category";
import CategoryDropdown from "./CategoryDropdown";
import { Inria_Serif } from "next/font/google";
import moment from "moment";
import { faker } from '@faker-js/faker';
import { useEffect } from "react";
import { createNoteAPI, updateNoteAPI } from "../services/notesApi";
import { getNotesCountFromCategories } from "../services/categoriesApi";
import { NotesCount } from "../types/NotesCount";


const inria = Inria_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface Props {
  selectedNote: Note|undefined;
  categories: Category[];
  onAdd: (note: Note) => void;
  onCloseModal: () => void;
  onEditNote: (note: Note) => void;
  updateNotesCount: (nc: NotesCount[]) => void;
}

export default function NoteForm({ selectedNote, categories, onAdd, onCloseModal, onEditNote, updateNotesCount}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id ?? 1);
  const [lastEdited, setLastEdited] = useState(moment().format("MMMM DD, YYYY") + " at " + moment().format("HH:MMa"));

  const selectedCategory = categories.find((c) => c.id == categoryId);

  useEffect(() => {

    if (selectedNote) {
      setTitle(selectedNote.title);
      setDescription(selectedNote.description);
      setCategoryId(selectedNote.categoryId);
      setLastEdited(
        moment(selectedNote.updatedAt).format("MMMM DD, YYYY") +
        " at " +
        moment(selectedNote.updatedAt).format("HH:MMa")
      );
    } else {
      // reset when creating a new note
      setTitle("");
      setDescription("");
      setCategoryId(categories[0]?.id ?? 1);
      setLastEdited(
        moment().format("MMMM DD, YYYY") + " at " + moment().format("HH:MMa")
      );
    }
  }, [selectedNote]);

  const handleCloseModal = async () => {
    if (title!=="" && description!==""){
        //only if there is content we save the note, otherwise we close the modal
        handleSubmit();
    }
    onCloseModal();
  };

  const handleSubmit = async () => {
    //to know if it is an edit or a create (submit) we need to check if selectedNote has a value

    if (!selectedNote){
      const newNote: Note = {
        id: faker.string.uuid(),
        title,
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        categoryId: categoryId ?? config.default_category,
      };
      await createNoteAPI(newNote).then(async () => {
        try {
          const data = await getNotesCountFromCategories();
          updateNotesCount(data.data);
        } catch (e) {
          console.error("Failed to fetch notes count", e);
        }

      });

      onAdd(newNote);

    } else {
      const editNote = {
        id: selectedNote.id,
        title,
        description,
        createdAt: selectedNote.createdAt,
        updatedAt: selectedNote.updatedAt,
        categoryId: selectedCategory?.id || config.default_category,
      };
      onEditNote(editNote);

      await updateNoteAPI(editNote).then(async () => {
        try {
          const data = await getNotesCountFromCategories();
          updateNotesCount(data.data);
        } catch (e) {
          console.error("Failed to fetch notes count", e);
        }

      });
    }
    
    //This is to reset for next time
    setTitle("");
    setDescription("");
    setCategoryId(categories[0]?.id ?? 1);
    setLastEdited(moment().format("MMMM DD, YYYY") + " at " + moment().format("HH:MMa"));
  };

  return (
    <div className="w-full h-screen p-10 flex flex-col">
      <div className="mb-4 w-64">
      <button
        onClick={() => handleCloseModal()}
        style={{fontSize:"30px", color:"#957139"}}
        className="absolute top-4 right-4 text-gray-600"
      >
        ✕
      </button>
        <CategoryDropdown
          categories={categories}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          selectedNote={selectedNote}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col p-8 rounded-lg shadow-lg relative"
        style={{
          backgroundColor: selectedCategory?.background,
          borderColor: selectedCategory?.color,
          borderWidth: "medium",
          marginBottom:"50px"
        }}
      >
        <div className="absolute top-4 right-4 text-black text-[12px]">{"Last Edited: "+lastEdited}</div>

        <input
          placeholder="Note Title"
          value={title}
          onChange={(e) => {setTitle(e.target.value); setLastEdited(moment().format("MMMM DD, YYYY") + " at " + moment().format("HH:MMa"))}}
          required
          className={`${inria.className} font-bold text-[24px] bg-transparent outline-none mb-4 w-full placeholder-black`}
        />

        <textarea
          placeholder="Pour your heart out..."
          value={description}
          onChange={(e) => {setDescription(e.target.value); setLastEdited(moment().format("MMMM DD, YYYY") + " at " + moment().format("HH:MMa"))}}
          className="flex-1 bg-transparent outline-none w-full resize-none text-[16px] placeholder-black"
        />
      </form>
    </div>
  );
}
