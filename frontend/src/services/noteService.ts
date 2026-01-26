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
  // Fallback localStorage methods
  private getStorageKey() {
    return 'dealsense_notes';
  }

  private getNotesFromStorage(): Note[] {
    if (typeof window === 'undefined') return [];
    const notes = localStorage.getItem(this.getStorageKey());
    return notes ? JSON.parse(notes) : [];
  }

  private saveNotesToStorage(notes: Note[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.getStorageKey(), JSON.stringify(notes));
  }

  async create(noteData: CreateNoteData): Promise<ApiResponse<Note>> {
    try {
      const response = await api.post('/notes', noteData);
      return handleApiResponse<Note>(response);
    } catch (error) {
      // Fallback to localStorage
      const notes = this.getNotesFromStorage();
      const newNote: Note = {
        _id: Date.now().toString(),
        ...noteData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      notes.unshift(newNote);
      this.saveNotesToStorage(notes);
      
      return {
        success: true,
        data: newNote,
        message: 'Note saved locally'
      };
    }
  }

  async getByLeadId(leadId: string): Promise<ApiResponse<Note[]>> {
    try {
      const response = await api.get(`/notes/lead/${leadId}`);
      return handleApiResponse<Note[]>(response);
    } catch (error) {
      // Fallback to localStorage
      const notes = this.getNotesFromStorage();
      const leadNotes = notes.filter(note => note.leadId === leadId);
      
      return {
        success: true,
        data: leadNotes,
        message: 'Notes retrieved from local storage'
      };
    }
  }

  async getAll(): Promise<ApiResponse<Note[]>> {
    try {
      console.log('Trying API call to /notes');
      const response = await api.get('/notes');
      console.log('API response:', response);
      return handleApiResponse<Note[]>(response);
    } catch (error) {
      console.log('API failed, using localStorage fallback');
      // Fallback to localStorage
      const notes = this.getNotesFromStorage();
      console.log('localStorage notes:', notes);
      
      return {
        success: true,
        data: notes,
        message: 'Notes retrieved from local storage'
      };
    }
  }
}

export const noteService = new NoteService();