"use client";

import { Category } from "../types/Category";
import { Note } from "../types/Note";

import { Inria_Serif} from "next/font/google";
import { formatDate } from "../utils/datesLib";

const inria = Inria_Serif({
    subsets: ["latin"],
    weight: ["400", "700"],
  });

interface NotesListProps {
  notes: Note[];
  categories: Category[];
  selectedCategory: number;
  onDelete: (id: string) => void;
}

export default function NotesList({ notes, categories, selectedCategory, onDelete }: NotesListProps) {

    if (selectedCategory > 0){ //if I dont have anything selected, show all categories
        notes = notes.filter((note) =>
            note.categoryId === selectedCategory
        );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1">
        {notes.map((note: Note) => {
          const category = categories.find(c => c.id === note.categoryId);
          const dateStr = formatDate(note.createdAt);
  
          return (
            
            <div
              key={note.id}
              style={{ backgroundColor: category && category.background, borderColor: category && category.color, borderWidth: 'medium' }}
              className="w-[95%] h-[10%px] p-4 rounded-lg shadow transform hover:rotate-0 transition-transform relative overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-2">
                    <div className="font-bold text-normal">{dateStr}</div>
                    <div className="text-normal">{category?.title}</div>
              </div>
              <h3 className={`${inria.className} font-bold mb-2 text-[24px]`}>{note.title}</h3>
              <p className="text-[12px] text-ellipsis line-clamp-8 whitespace-pre-wrap overflow-hidden break-words">{note.description}</p>
  
              <div className="mt-3 flex items-center justify-between">
                
                {/*
                <button
                  onClick={() => onDelete(note.id)}
                  className="text-red-700 font-semibold hover:underline"
                >
                  Delete
                </button>*/}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

