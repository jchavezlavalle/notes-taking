"use client";

import React from "react";
import { useState } from "react";
import { Category } from "../types/Category";

interface CategoryListProps {
  categories: Category[];
  onSelectedCategory: (id: number) => void;
}

export default function CategoryList({ categories , onSelectedCategory}: CategoryListProps) {
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    
    const onClickedCategory = (id: number) => {
        setSelectedCategory(id);
    }

    const onSelectedAllCategories = () => {
      onSelectedCategory(0);
    }

    return (
      <div className="space-y-2">
        <div className="font-bold text-[14px] cursor-pointer" onClick={() => onSelectedAllCategories()}>All categories</div>
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

            <span className="font-normal text-normal">{1}</span>
          </div>
        ))}
      </div>
    );
  }