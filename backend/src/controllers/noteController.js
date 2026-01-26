import Note from '../models/note.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const createNote = asyncHandler(async (req, res) => {
  const { leadId, content } = req.body;

  if (!leadId || !content) {
    throw new ApiError(400, 'Lead ID and content are required');
  }

  const note = await Note.create({
    leadId,
    content: content.trim()
  });

  return res.status(201).json(
    new ApiResponse(201, note, 'Note created successfully')
  );
});

const getNotesByLead = asyncHandler(async (req, res) => {
  const { leadId } = req.params;

  const notes = await Note.find({ leadId })
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, notes, 'Notes retrieved successfully')
  );
});

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find()
    .populate('leadId', 'name phone budget leadType status')
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, notes, 'Notes retrieved successfully')
  );
});

export {
  createNote,
  getNotesByLead,
  getAllNotes
};