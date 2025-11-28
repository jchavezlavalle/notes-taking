
export async function getUserByEmailAPI(email: string) {
    const res = await fetch(`http://localhost:8000/api/users/?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  }
  