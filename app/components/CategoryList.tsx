"use client";

import React from "react";
import { useState } from "react";
import { Category } from "../types/Category";
import { NotesCount } from "../types/NotesCount";

interface CategoryListProps {
  categories: Category[];
  notesCount: NotesCount[];
  onSelectedCategory: (id: number) => void;
}

export default function CategoryList({ categories , notesCount,  onSelectedCategory}: CategoryListProps) {
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    
    const onClickedCategory = (id: number) => {
        setSelectedCategory(id);
    }

    const onSelectedAllCategories = () => {
      setSelectedCategory(0);
      onSelectedCategory(0);
    }

    const getCountNotes = (idCategory: any) => {
      return notesCount.find((nc) => nc.categoryId == idCategory)?.countNotes;
    }

    return (
      <div className="space-y-2">
        <div className="font-bold text-[16px] cursor-pointer" onClick={() => onSelectedAllCategories()}>All categories</div>
        {categories.map((cat) => (

          <div
            key={cat.id}
            className="flex justify-between rounded-lg transition cursor-pointer"
            onClick={() => onSelectedCategory(cat.id)}
          >
            
            <div className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: cat.color }}
            ></span>
                <span onClick={() => onClickedCategory(cat.id)} className={`font-[12px] ${
            selectedCategory === cat.id ? "font-bold" : "font-[12px]"
          }`}>{cat.title}</span>
            </div>

            <span className="font-normal text-normal">{getCountNotes(cat.id)}</span>
          </div>
        ))}
      </div>
    );
  }