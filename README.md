# Netflix Clone 🎬

A Netflix clone built using React.js as a Capstone Project.

## 👨‍💻 Built By
- Name: Akanksha Kumari
- Course: B.Tech 1st Year
- Project Type: Capstone Project (WEB DEV -II)

## 🛠️ Technologies Used
- **React.js** — Frontend library for building the UI
- **React Router DOM** — For navigation between pages
- **Axios** — For making API calls to fetch movie data
- **TMDB API** — The Movie Database API for real movie data
- **Firebase** — For user login and authentication
- **CSS** — For styling the app like Netflix
- **localStorage** — For Continue Watching feature

## 📁 Folder Structure
src/
├── Components/  → Navbar, Banner, Row, Footer,
│                  ContinueWatching, ProtectedRoute
├── Pages/       → Home, Login, Watch,
│                  Categories, ProfileSelect
├── context/     → AuthContext
├── Services/    → api.js, firebase.js
├── App.js       → Main routing file
└── index.js     → Entry point

## ✅ Features
- User Login, Signup and Logout
- Profile switching with multiple profiles
- Browse movies by category
- Hero banner with featured movie
- Horizontal scrollable movie rows
- Watch movie trailers
- Continue Watching row
- Fully responsive design
- Protected routes

## 🚀 How to Run
1. Clone the repository
2. Run npm install
3. Add your TMDB API key in .env file
4. Run npm start