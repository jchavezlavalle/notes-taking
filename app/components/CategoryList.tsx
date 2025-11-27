"use client";

import React from "react";
import { Category } from "../types/Category";

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
    return (
      <div className="space-y-2">
        <div className="font-bold text-[12px]">All categories</div>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center gap-3 p-2 rounded-lg transition"
          >
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: cat.color }}
            ></span>
  
            <span className="font-normal text-[12px]">{cat.title}</span>
          </div>
        ))}
      </div>
    );
  }