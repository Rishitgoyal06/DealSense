"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { followUpService } from "@/services/followUpService";
import { leadService } from "@/services/leadService";

export default function NewFollowUpPage() {
  const [scheduledFor, setScheduledFor] = useState("");
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
    if (!leadId) return;
    
    setLoading(true);
    setError("");

    try {
      const payload = {
        leadId,
        scheduledFor,
        note
      };

      await followUpService.create(payload);
      router.push("/followups");
    } catch (error: any) {
      setError(error.message || "Failed to create follow-up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Schedule Follow-up {leadName && `for ${leadName}`}
            </h1>
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="scheduledFor" className="block text-sm font-medium text-gray-700">
                Scheduled Date & Time
              </label>
              <input
                type="datetime-local"
                id="scheduledFor"
                value={scheduledFor}
                onChange={(e) => setScheduledFor(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                Note
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                placeholder="Add any notes for this follow-up..."
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Scheduling..." : "Schedule Follow-up"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}