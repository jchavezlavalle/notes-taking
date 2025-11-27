"use client";

import { useState, FormEvent } from "react";
import { Note } from "../types/Note";
import { randomUUID } from "crypto";
import { config } from "../config";
import { Category } from "../types/Category";
import CategoryDropdown from "./CategoryDropdown";
import { Inria_Serif } from "next/font/google";
import moment from "moment";

const inria = Inria_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface Props {
  categories: Category[];
  onAdd: (note: Note) => void;
}

export default function NoteForm({ categories, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id ?? 1);

  const selectedCategory = categories.find((c) => c.id === categoryId);
  const lastEdited = moment().format("MMMM DD, YYYY") + " at " + moment().format("HH:MMa");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote: Note = {
      id: randomUUID(),
      title,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      categoryId: categoryId ?? config.default_category,
    };
    onAdd(newNote);
    setTitle("");
    setDescription("");
    setCategoryId(categories[0]?.id ?? 1);
  };

  return (
    <div className="w-full h-screen p-10 flex flex-col">
      <div className="mb-4 w-64">
        <CategoryDropdown
          categories={categories}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
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
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={`${inria.className} font-bold text-[24px] bg-transparent outline-none mb-4 w-full placeholder-black`}
        />

        <textarea
          placeholder="Note content"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 bg-transparent outline-none w-full resize-none text-[16px] placeholder-black"
        />
      </form>
    </div>
  );
}
