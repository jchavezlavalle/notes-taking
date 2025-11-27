"use client";

import { useState, FormEvent } from "react";
import { Note } from "../types/Note";
import { faker } from '@faker-js/faker';

import { config } from "../config";

interface Props {
  onAdd: (note: Note) => void;
}

export default function NoteForm({ onAdd }: Props) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newNote: Note = {
      id: Date.now(),
      title,
      description,
      createdAt: new Date().toISOString(),
      categoryId: faker.number.int({min: 1,max: config.default_number_categories})
    };

    onAdd(newNote);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 20 }}>
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
