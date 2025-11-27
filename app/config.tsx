
export const config = {
    default_number_categories : Number(process.env.DEFAULT_NUMBER_CATEGORIES) || 3,
    message_when_no_notes: "I'm just here waiting for your charming notes...",
    default_category: Number(process.env.DEFAULT_CATEGORY_SELECTED) || 1, // When creating notes we have a default category
}
    