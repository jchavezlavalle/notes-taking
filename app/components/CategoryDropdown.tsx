import { Listbox } from "@headlessui/react";
import { Category } from "../types/Category";
import { Note } from "../types/Note";

interface Props {
  categories: Category[];
  categoryId: number;
  setCategoryId: (id: number) => void;
  selectedNote: Note | undefined;
}

export default function CategoryDropdown({
  categories,
  categoryId,
  setCategoryId,
}: Props) {
  
  // Filter all except currently selected
  const filteredCategories = categories.filter((cat) => cat.id !== categoryId);

  return (
    <Listbox value={categoryId} onChange={setCategoryId}>
      <div className="relative">

        <Listbox.Button
          style={{
            borderColor: "#957139",
            width: "300px",
            borderWidth: "1px",
          }}
          className="w-full border p-2 rounded flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full mr-4"
              style={{
                backgroundColor:
                  categories.find((c) => c.id === categoryId)?.color,
              }}
            ></span>

            {categories.find((c) => c.id === categoryId)?.title}
          </div>

          <span
            style={{ fontSize: "32px" }}
            className="material-symbols-outlined border-elements"
          >
            keyboard_arrow_down
          </span>
        </Listbox.Button>

        <Listbox.Options
          style={{ width: "300px" }}
          className="absolute w-full modal-background rounded z-10"
        >
          {filteredCategories.map((cat) => (
            <Listbox.Option key={cat.id} value={cat.id}>
              {({ selected }) => (
                <div
                  className={`p-2 cursor-pointer flex items-center gap-2 hover:bg-gray-100 ${
                    selected ? "font-bold" : ""
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full mr-4"
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
