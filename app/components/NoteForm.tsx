"use client";

import { useState, FormEvent } from "react";
import { Note } from "../types/Note";
import moment from 'moment';
import { randomUUID } from 'crypto';

import { config } from "../config";
import { Category } from "../types/Category";
import CategoryDropdown from "./CategoryDropdown";

interface Props {
  categories: Category[];
  onAdd: (note: Note) => void;
}

export default function NoteForm({ categories, onAdd }: Props) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(1);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newNote: Note = {
      id: randomUUID(),
      title,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(), //since its creation, its same as createdAt
      categoryId: categoryId === null? config.default_category: categoryId,
    };

    onAdd(newNote);
    setTitle("");
    setDescription("");
    setCategoryId(categories[0].id);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>

    <CategoryDropdown
    categories={categories}
    categoryId={categoryId}
    setCategoryId={setCategoryId}
    />

      <input
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ display: "block", marginBottom: 10 }}
      />

      <textarea
        placeholder="Note content"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button type="submit">Add Note</button>
    </form>
  );
}
