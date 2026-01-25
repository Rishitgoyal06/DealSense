"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Users } from "lucide-react";
import { followUpService, FollowUp } from "@/services/followUpService";
import { leadService, Lead } from "@/services/leadService";

interface FollowUpWithLead extends FollowUp {
  lead?: Lead;
  originalLeadId?: string;
}

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState<FollowUpWithLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodaysFollowUps();
  }, []);

  const fetchTodaysFollowUps = async () => {
    try {
      const response = await followUpService.getTodaysFollowUps();
      if (response.success) {
        // Backend already populates leadId with lead data
        setFollowUps(response.data.map(followUp => ({
          ...followUp,
          originalLeadId: followUp.leadId._id || followUp.leadId, // Store original ID
          lead: followUp.leadId // leadId is already populated with lead object
        })));
      }
    } catch (error: any) {
      setError(error.message || "Failed to fetch follow-ups");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await followUpService.complete(id);
      fetchTodaysFollowUps();
    } catch (error: any) {
      setError(error.message || "Failed to complete follow-up");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-lg text-base-content">Loading follow-ups...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <header className="bg-base-100 shadow-lg border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)" }}>
                <Clock size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-base-content">Today's Follow-ups</h1>
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
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="bg-base-100 shadow-xl overflow-hidden rounded-2xl border border-base-300">
          {followUps.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No follow-ups for today</h3>
              <p className="text-gray-600 mb-6">Schedule follow-ups from the leads page.</p>
              <Link
                href="/leads"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Users size={16} />
                <span>View Leads</span>
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {followUps.map((followUp) => (
                <li key={followUp._id} className="px-8 py-6 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {followUp.lead ? followUp.lead.name : `Lead ID: ${followUp.leadId}`}
                        </h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          followUp.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {followUp.status.toUpperCase()}
                        </span>
                      </div>
                      {followUp.lead && (
                        <div className="mb-2 flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {followUp.lead.phone}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            {followUp.lead.leadType?.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            followUp.lead.status === 'active' ? 'bg-green-100 text-green-800' :
                            followUp.lead.status === 'negotiating' ? 'bg-blue-100 text-blue-800' :
                            followUp.lead.status === 'closed' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {followUp.lead.status?.toUpperCase()}
                          </span>
                        </div>
                      )}
                      <p className="text-gray-600 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(followUp.scheduledFor).toLocaleString()}
                      </p>
                      {followUp.note && (
                        <p className="text-gray-500 flex items-start">
                          <svg className="w-4 h-4 mr-2 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          {followUp.note}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-6 flex flex-col space-y-2">
                      {followUp.lead && (
                        <Link
                          href={`/leads/${followUp.originalLeadId}`}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center space-x-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>View Lead</span>
                        </Link>
                      )}
                      {followUp.status === 'pending' ? (
                        <button
                          onClick={() => handleComplete(followUp._id!)}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Mark Complete</span>
                        </button>
                      ) : (
                        <span className="px-4 py-2 text-sm font-medium rounded-xl bg-green-100 text-green-800 flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Completed</span>
                        </span>
                      )}
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