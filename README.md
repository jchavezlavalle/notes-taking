# Notes-taking app 📝

Hi 👋 this is the frontend side of the app for the notes-taking app. 
Below you can find the main features of the application.

# 🧠 What is notes-taking app? 
Notes-taking app helps you manage your notes, allowing you to manage, organize and customize your notes. The app is built in React/NextJS and provides a very intuitive user interface to the user.

# 🤝 Requested features
- **🔑 Login section:** Allows to log in into the app.
- **🔑 Sign up section:** Users can sign up if they are new to the app.
- **🗒️ Notes management:** Allows users to create, read and update notes. Users can change the notes content and the category related.
- **🗂️ Notes organization:** Allows to organize notes by categories. Each category owns a different color and name to be able to identify them. When a user clicks over one category on the list, just the notes that belong to that category are shown. Also, users can see the number of notes related to each category.

# 🚀 Endpoints
For allowing the users to create and edit notes through the app, a series of different API endpoints have been created on the backend side, these endpoints allow the communication between the frontend (this repo) and he backend side of the app [You can see more about the different endpoints exposed in the backend here.](https://github.com/jchavezlavalle/notes_app_backend)

# ✈️ Run the app
To start the app in dev mode just run the following command: 
```
npm run dev
```
The app will start by default running on port 3000.

# 🧪 Run the tests
You can run the tests with the following command:
```
npm run test
```
At the moment there is only one example test for the success modal window but this can be taken as an example to develop future tests for all the components throughout the app.

# 🤖 AI Use
For speeding up the process I have used Claude, ChatGPT to search for doubts on how to setup the test configuration. Also I have used it to clear up doubts on styling with tailwind.
