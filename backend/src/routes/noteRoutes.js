import express from 'express';
import { createNote, getNotesByLead, getAllNotes } from '../controllers/noteController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Create a new note
router.post('/', createNote);

// Get notes by lead ID
router.get('/lead/:leadId', getNotesByLead);

// Get all notes
router.get('/', getAllNotes);

export default router;