"use client";

import { Category } from "../types/Category";
import { Note } from "../types/Note";

interface NotesListProps {
  notes: Note[];
  categories: Category[];
  onDelete: (id: number) => void;
}

export default function NotesList({ notes, categories, onDelete }: NotesListProps) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {notes.map((note: Note) => {
          const category = categories.find(c => c.id === note.categoryId);
  
          return (
            <div
              key={note.id}
              style={{ backgroundColor: category && category.background }}
              className="p-10 rounded-lg shadow transform hover:rotate-0 transition-transform relative"
            >
  
              <h3 className="font-bold mb-2">{note.title}</h3>
              <p className="whitespace-pre-wrap">{note.description}</p>
  
              <div className="mt-3 flex items-center justify-between">
                
  
                <button
                  onClick={() => onDelete(note.id)}
                  className="text-red-700 font-semibold hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

