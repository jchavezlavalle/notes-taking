import { Category } from "../types/Category";

export default function generateDefaultCategories() {
    let res: Category[] = [];
    let randomCategory = { id: 1,
        title:"Random Thoughts",
        color: "#EF9C66",
        background: "#EF9C6680"}
    res.push(randomCategory);

    let schoolCategory = { id: 2,
        title:"School",
        color: "#FCDC94",
        background: "#FCDC9480"}
    res.push(schoolCategory);

    let personalCategory = { id: 3,
        title:"Personal",
        color: "#78ABA8",
        background: "#78ABA880"}
    res.push(personalCategory);
    return res;
}