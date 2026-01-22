"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { quotationService, Quotation } from "@/services/quotationService";

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const response = await quotationService.getAll();
      if (response.success) {
        setQuotations(response.data);
      }
    } catch (error: any) {
      setError(error.message || "Failed to fetch quotations");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkShared = async (id: string) => {
    try {
      await quotationService.markShared(id);
      fetchQuotations();
    } catch (error: any) {
      setError(error.message || "Failed to mark as shared");
    }
  };

  const handleResponseUpdate = async (id: string, response: string) => {
    try {
      await quotationService.updateResponse(id, response);
      fetchQuotations();
    } catch (error: any) {
      setError(error.message || "Failed to update response");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading quotations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Quotations</h1>
            </div>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 px-4 py-3 rounded-xl text-sm font-medium border border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
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

        <div className="bg-white shadow-xl overflow-hidden rounded-2xl border border-gray-100">
          {quotations.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No quotations yet</h3>
              <p className="text-gray-600 mb-6">Create quotations from the leads page.</p>
              <Link
                href="/leads"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>View Leads</span>
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {quotations.map((quotation) => (
                <li key={quotation._id} className="px-8 py-6 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{quotation.brokerName}</h3>
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-500">Broker</span>
                      </div>
                      <p className="text-gray-600 mb-3">{quotation.propertySummary}</p>
                      <p className="text-2xl font-bold text-green-600 mb-2">
                        ₹{quotation.quotedPrice.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right ml-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          quotation.sharedWithCustomer ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {quotation.sharedWithCustomer ? 'Shared' : 'Not Shared'}
                        </span>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          quotation.customerResponse === 'interested' ? 'bg-green-100 text-green-800' :
                          quotation.customerResponse === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {quotation.customerResponse.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {!quotation.sharedWithCustomer && (
                          <button
                            onClick={() => handleMarkShared(quotation._id!)}
                            className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                            Mark Shared
                          </button>
                        )}
                        <select
                          value={quotation.customerResponse}
                          onChange={(e) => handleResponseUpdate(quotation._id!, e.target.value)}
                          className="text-xs border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="no_response">No Response</option>
                          <option value="interested">Interested</option>
                          <option value="rejected">Rejected</option>
                        </select>
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