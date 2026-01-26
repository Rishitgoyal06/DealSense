"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { leadService } from "@/services/leadService";
import { noteService } from "@/services/noteService";
import { MapPinHouse, ArrowLeft, FileText } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

function NewInteractionForm() {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [leadName, setLeadName] = useState("");
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const leadId = searchParams.get("leadId");

  useEffect(() => {
    if (leadId) {
      fetchLead();
    }
  }, [leadId]);

  const fetchLead = async () => {
    try {
      const response = await leadService.getById(leadId!);
      if (response.success) {
        setLeadName(response.data.name);
      }
    } catch (error) {
      console.error("Failed to fetch lead");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadId || !note.trim()) return;
    
    setLoading(true);
    setError("");

    try {
      await noteService.create({
        leadId,
        content: note
      });
      
      alert(`Note saved successfully for ${leadName}!`);
      router.push("/leads");
    } catch (error: any) {
      setError(error.message || "Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      <header className="bg-base-100 shadow-lg border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: "#166534" }}>
                <FileText size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-base-content">
                  Add Note {leadName && `for ${leadName}`}
                </h1>
                <p className="text-sm text-base-content/70">Record important information about this lead</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => router.back()}
                className="btn btn-ghost btn-sm flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #6B7280 0%, #4B5563 100%)" }}>
                <FileText size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-base-content">Lead Note</h2>
                <p className="text-sm text-base-content/70">Add important details or observations</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="alert alert-error">
                  <span>{error}</span>
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content">Note Details</span>
                </label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                  rows={6}
                  placeholder="Enter your notes about this lead... (e.g., conversation details, preferences, concerns, next steps)"
                  className="textarea textarea-bordered w-full focus:textarea-success"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !note.trim()}
                  className="btn text-white" 
                  style={{ backgroundColor: "#166534" }}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FileText size={16} />
                      Save Note
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function NewInteractionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>}>
      <NewInteractionForm />
    </Suspense>
  );
}