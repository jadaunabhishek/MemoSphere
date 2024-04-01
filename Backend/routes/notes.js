const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
var fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// ROUTE 1: get loggedin user note's detail at GET api/auth/fetchallnotes (login required)
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured.");
  }
});

// ROUTE 2: add notes for logged in user only at POST api/auth/addnotes (login required)
router.post(
  "/addnotes",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleat five charaters ").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occured.");
    }
  }
);

// ROUTE 3: update notes for logged in user only at POST api/auth/updatenote (login required)
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, descripton, tag } = req.body;
  try {
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (descripton) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  let note = await Notes.findById(req.params.id);
  if (!note) {
   return res.status(404).send("Not Found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
  
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured.");
  }
});

// ROUTE 4: delete notes for logged in user only at DELETE api/auth/deletenote (login required)
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
 
  try {
    
  let note = await Notes.findById(req.params.id);
  if (!note) {
   return res.status(404).send("Not Found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({ "Success":"Note has been deleted.",note:note });
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured.");
  }
});

module.exports = router;
