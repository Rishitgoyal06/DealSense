"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Users } from "lucide-react";
import { quotationService, Quotation } from "@/services/quotationService";

import LoadingScreen from "@/components/LoadingScreen";

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
    return <LoadingScreen message="Loading quotations..." />;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <header className="bg-base-100 shadow-lg border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)" }}>
                <FileText size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-base-content">Quotations</h1>
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
          {quotations.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText size={40} className="text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-base-content mb-2">No quotations yet</h3>
              <p className="text-base-content/70 mb-6">Create quotations from the leads page.</p>
              <Link
                href="/leads"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Users size={16} />
                <span>View Leads</span>
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-base-300">
              {quotations.map((quotation) => (
                <li key={quotation._id} className="px-8 py-6 hover:bg-base-200 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-base-content">{quotation.brokerName}</h3>
                        <div className="w-2 h-2 bg-base-content/30 rounded-full"></div>
                        <span className="text-sm text-base-content/60">Broker</span>
                      </div>
                      <p className="text-base-content/70 mb-3">{quotation.propertySummary}</p>
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
                          className="text-xs border border-base-300 rounded-lg px-3 py-2 bg-base-100 shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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