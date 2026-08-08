import express from 'express';
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from '../controllers/notesControllers.js';

const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;

// c27zX04BHyIFfcnq
// shambhavisoni2020_db_user
// mongodb+srv://<db_username>:c27zX04BHyIFfcnq@cluster0.nbzdhpw.mongodb.net/?appName=Cluster0