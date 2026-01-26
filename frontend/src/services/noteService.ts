import api, { handleApiResponse } from '@/lib/api';
import { ApiResponse } from '@/types';

export interface Note {
  _id?: string;
  leadId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateNoteData {
  leadId: string;
  content: string;
}

class NoteService {
  async create(noteData: CreateNoteData): Promise<ApiResponse<Note>> {
    const response = await api.post('/notes', noteData);
    return handleApiResponse<Note>(response);
  }

  async getByLeadId(leadId: string): Promise<ApiResponse<Note[]>> {
    const response = await api.get(`/notes/lead/${leadId}`);
    return handleApiResponse<Note[]>(response);
  }

  async getAll(): Promise<ApiResponse<Note[]>> {
    const response = await api.get('/notes');
    return handleApiResponse<Note[]>(response);
  }
}

export const noteService = new NoteService();