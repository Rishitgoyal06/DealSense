"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { followUpService } from "@/services/followUpService";
import { leadService } from "@/services/leadService";

export default function NewFollowUpForm() {
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
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      <header className="bg-base-100 shadow-lg border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-base-content">
              Schedule Follow-up {leadName && `for ${leadName}`}
            </h1>
            <button
              onClick={() => router.back()}
              className="btn btn-ghost btn-sm"
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="card bg-base-100 shadow-xl">
          <form onSubmit={handleSubmit} className="card-body space-y-6">
            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">Scheduled Date & Time</span>
              </label>
              <input
                type="datetime-local"
                id="scheduledFor"
                value={scheduledFor}
                onChange={(e) => setScheduledFor(e.target.value)}
                required
                className="input input-bordered w-full focus:input-success"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">Note</span>
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                placeholder="Add any notes for this follow-up..."
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
                disabled={loading}
                className="btn text-white"
                style={{ backgroundColor: "#166534" }}
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