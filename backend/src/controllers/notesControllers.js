import Note from '../models/note.js'; // Import the Note model

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Sort notes by creation date in descending order
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: 'Internal Server Error'});
  }
}

export async function getNoteById(req, res) {
  try {
    const noteById = await Note.findById(req.params.id);
    if(!noteById){
      return res.status(404).json({message: 'note not found'});
    }
    res.status(200).json(noteById);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: 'Internal Server Error'});
  }
}

export async function createNote(req, res) {
  try{
    const {title, content} = req.body;
    const newNote = new Note({title, content});
    const saveNote = await newNote.save();
    res.status(201).json(saveNote);
  }
  catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({message: 'Internal Server Error'});
  }
}

export async function updateNote(req, res) {
  try{
    const {title, content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
    if(!updatedNote) {
      return res.status(404).json({message: 'Note not found'});
    }
    res.status(200).json(updatedNote);
  }
  catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({message: 'Internal Server Error'});
  }
}

export async function deleteNote(req, res) {
  try{
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote){
      return res.status(404).json({message: 'Note not found'});
    }
    res.status(200).json({message: 'Note deleted successfully'});
  }
  catch(error) {
    console.error("Error deleting note:", error);
    res.status(500).json({message: 'Internal Server Error'});
  }
}