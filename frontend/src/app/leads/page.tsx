"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { leadService, Lead } from "@/services/leadService";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const router = useRouter();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await leadService.getAll();
      if (response.success) {
        setLeads(response.data);
      } else {
        setError("Failed to fetch leads");
      }
    } catch (error: any) {
      setError(error.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading leads...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Leads</h1>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/leads/new"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add New Lead</span>
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 px-4 py-3 rounded-xl text-sm font-medium border border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
              >
                ← Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="bg-white shadow-xl overflow-hidden rounded-2xl border border-gray-100">
          {leads.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No leads yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first lead.</p>
              <Link
                href="/leads/new"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add New Lead</span>
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <li key={lead._id} className="px-8 py-6 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{lead.name}</h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          lead.leadType === 'buy' ? 'bg-blue-100 text-blue-800' :
                          lead.leadType === 'rent' ? 'bg-green-100 text-green-800' :
                          lead.leadType === 'sell' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {lead.leadType.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          lead.status === 'active' ? 'bg-green-100 text-green-800' :
                          lead.status === 'negotiating' ? 'bg-yellow-100 text-yellow-800' :
                          lead.status === 'closed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {lead.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-1 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {lead.phone}
                      </p>
                      <p className="text-gray-500 mb-2">{lead.requirement}</p>
                      {lead.preferredLocations && lead.preferredLocations.length > 0 && (
                        <p className="text-sm text-gray-400 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {lead.preferredLocations.join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-6">
                      <p className="text-2xl font-bold text-green-600 mb-1">
                        ₹{lead.budget.toLocaleString()}
                      </p>
                      {(lead.budgetMin || lead.budgetMax) && (
                        <p className="text-sm text-gray-500 mb-2">
                          Range: ₹{lead.budgetMin?.toLocaleString() || '0'} - ₹{lead.budgetMax?.toLocaleString() || 'Max'}
                        </p>
                      )}
                      <div className="flex items-center justify-end space-x-2 mb-2">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-700">{lead.readinessScore}/100</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">
                        {new Date(lead.createdAt || "").toLocaleDateString()}
                      </p>
                      <div className="flex space-x-1">
                        <Link
                          href={`/quotations/new?leadId=${lead._id}`}
                          className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          Quote
                        </Link>
                        <Link
                          href={`/followups/new?leadId=${lead._id}`}
                          className="text-xs bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          Follow-up
                        </Link>
                        <Link
                          href={`/payments/new?leadId=${lead._id}`}
                          className="text-xs bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          Payment
                        </Link>
                        <Link
                          href={`/interactions/new?leadId=${lead._id}`}
                          className="text-xs bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          Note
                        </Link>
                      </div>
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