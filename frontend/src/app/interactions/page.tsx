"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Users } from "lucide-react";
import { noteService, Note } from "@/services/noteService";
import { leadService, Lead } from "@/services/leadService";
import LoadingScreen from "@/components/LoadingScreen";

interface NoteWithLead extends Note {
  lead?: Lead;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<NoteWithLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await noteService.getAll();
      if (response.success && Array.isArray(response.data)) {
        // Fetch lead details for each note
        const notesWithLeads = await Promise.all(
          response.data.map(async (note) => {
            try {
              const leadResponse = await leadService.getById(note.leadId);
              return {
                ...note,
                lead: leadResponse.success ? leadResponse.data : undefined
              };
            } catch {
              return note;
            }
          })
        );
        setNotes(notesWithLeads);
      } else {
        console.error('Invalid response format:', response);
        setNotes([]);
      }
    } catch (error: any) {
      console.error('Fetch notes error:', error);
      setError(error.message || "Failed to fetch notes");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Loading notes..." />;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <header className="bg-base-100 shadow-lg border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #6B7280 0%, #4B5563 100%)" }}>
                <FileText size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-base-content">Notes</h1>
            </div>
            <Link
              href="/dashboard"
              className="text-base-content/70 hover:text-base-content px-4 py-3 rounded-xl text-sm font-medium border border-base-300 hover:border-base-content/50 transition-all duration-200 bg-base-100 shadow-sm hover:shadow-md"
            >
              ← Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 alert alert-error">
            <span>{error}</span>
          </div>
        )}

        <div className="bg-base-100 shadow-xl overflow-hidden rounded-2xl border border-base-300">
          {notes.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-base-content mb-2">No notes yet</h3>
              <p className="text-base-content/70 mb-6">Add notes from the leads page.</p>
              <Link
                href="/leads"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Users size={16} />
                <span>View Leads</span>
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-base-300">
              {notes.map((note) => (
                <li key={note._id} className="px-8 py-6 hover:bg-base-200 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-base-content">
                          {note.lead ? note.lead.name : `Lead ID: ${note.leadId}`}
                        </h3>
                        {note.lead && (
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            note.lead.leadType === 'buy' ? 'bg-blue-100 text-blue-800' :
                            note.lead.leadType === 'rent' ? 'bg-green-100 text-green-800' :
                            note.lead.leadType === 'sell' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {note.lead.leadType.toUpperCase()}
                          </span>
                        )}
                      </div>
                      
                      <div className="bg-base-200 rounded-lg p-4 mb-3">
                        <p className="text-base-content whitespace-pre-wrap">{note.content}</p>
                      </div>
                      
                      {note.lead && (
                        <div className="flex items-center space-x-4 text-sm text-base-content/70">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {note.lead.phone}
                          </span>
                          <span>₹{note.lead.budget.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right ml-6">
                      <p className="text-xs text-base-content/50 mb-2">
                        {new Date(note.createdAt || "").toLocaleDateString()}
                      </p>
                      <p className="text-xs text-base-content/50">
                        {new Date(note.createdAt || "").toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}