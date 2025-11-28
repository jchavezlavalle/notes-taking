
export async function getAllCategoriesAPI() {
    const res = await fetch("http://localhost:8000/api/categories/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  
    if (!res.ok) throw new Error("Failed to create note");
    return res.json();
  }

  export async function getCategoryById(categoryId:number) {
    const res = await fetch(`http://localhost:8000/api/categories/${categoryId}/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  
    if (!res.ok) throw new Error("Failed to update note");
    return res.json();
  }