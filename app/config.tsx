
export const config = {
    default_number_categories : Number(process.env.DEFAULT_NUMBER_CATEGORIES) || 3,
    message_when_no_notes: process.env.MESSAGE_WHEN_NO_NOTES || "I'm just here waiting for your charming notes...",
    default_category: Number(process.env.DEFAULT_CATEGORY_SELECTED) || 1, // When creating notes we have a default category
    default_login_welcome_message: process.env.DEFAULT_LOGIN_WELCOME_MESSAGE || "Yay, New Friend!",
    default_signin_welcome_message: process.env.DEFAULT_SIGNIN_WELCOME_MESSAGE || "Yay, You're Back!",
}
    