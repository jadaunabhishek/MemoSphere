import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      {/* Router is used to connect pages */}
      <NoteState>
        <Router>
          <Navbar />
          <Alert
            message="Welcome to NoteKeeper! To get started, simply click the '+' button to create a new note. You can organize your notes by adding titles and categories. Don't worry about losing your thoughts - NoteKeeper automatically saves your notes as you type. Happy note-taking!"
          />
          <div className="container">
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
