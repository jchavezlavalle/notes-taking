import { Listbox } from "@headlessui/react";
import { Category } from "../types/Category";

interface CategoryDropdownProps {
    categories: Category[];
    categoryId: number;
    setCategoryId: (id:number) => void;
}
export default function CategoryDropdown({ categories, categoryId, setCategoryId }: CategoryDropdownProps) {
    
    let filteredCategories = categories.filter((cat) => cat.id !== categoryId);

    return (
      <Listbox value={categoryId} onChange={setCategoryId}>
        <div className="relative">
  
          <Listbox.Button style={{borderColor: "#957139",
          width: "225px",
          borderWidth: "2px"}} className="w-full border p-2 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: categories.find(c => c.id === categoryId)?.color }}
              ></span>
              {categories.find(c => c.id === categoryId)?.title}
              <span className="material-symbols-outlined  border-elements">
    keyboard_arrow_down
  </span>
            </div>
          </Listbox.Button>
  
          <Listbox.Options className="absolute w-full modal-background rounded shadow-md z-10">
            {filteredCategories.map((cat) => (
              <Listbox.Option key={cat.id} value={cat.id}>
                {({ selected }) => (
                  <div
                    className={`p-2 cursor-pointer flex items-center gap-2 hover:bg-gray-100 ${
                      selected ? "font-bold" : ""
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    ></span>
                    {cat.title}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    );
  }
  