"use client";

import React from "react";
import { Category } from "../types/Category";
import { NotesCount } from "../types/NotesCount";

interface CategoryListProps {
  categories: Category[];
  notesCount: NotesCount[];
  onSelectedCategory: (id: number) => void;
  selectedCategory: number;
}

export default function CategoryList({ categories, notesCount, onSelectedCategory, selectedCategory }: CategoryListProps) {

  const onSelectedAllCategories = () => {
    onSelectedCategory(0);
  }

  const getCountNotes = (idCategory: any) => {
    return notesCount.find((nc) => nc.categoryId == idCategory)?.countNotes || 0;
  }

  return (
    <div className="space-y-2">
      <div
        className={`font-bold text-[16px] cursor-pointer ${selectedCategory === 0 ? "font-bold" : ""}`}
        onClick={onSelectedAllCategories}
      >
        All categories
      </div>

      {categories.map((cat) => (
        <div
          key={cat.id}
          className={`flex justify-between rounded-lg transition cursor-pointer ${selectedCategory === Number(cat.id) ? "font-bold" : ""}`}
          onClick={() => onSelectedCategory(Number(cat.id))}
        >
          <div className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: cat.color }}
            ></span>
            <span className="font-[12px]">{cat.title}</span>
          </div>

          <span className="font-normal text-normal">{getCountNotes(Number(cat.id))}</span>
        </div>
      ))}
    </div>
  );
}
