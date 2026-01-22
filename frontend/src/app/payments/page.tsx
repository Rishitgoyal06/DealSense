"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { paymentService, PaymentSchedule } from "@/services/paymentService";

export default function PaymentsPage() {
  const [riskyPayments, setRiskyPayments] = useState<PaymentSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRiskyPayments();
  }, []);

  const fetchRiskyPayments = async () => {
    try {
      const response = await paymentService.getRiskyPayments();
      if (response.success) {
        setRiskyPayments(response.data);
      }
    } catch (error: any) {
      setError(error.message || "Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  const handleRecordPayment = async (id: string) => {
    try {
      await paymentService.recordPayment(id);
      fetchRiskyPayments();
    } catch (error: any) {
      setError(error.message || "Failed to record payment");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading payments...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Payment Schedules</h1>
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
          {riskyPayments.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No overdue payments</h3>
              <p className="text-gray-600 mb-6">All payments are on track!</p>
              <Link
                href="/leads"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>View Leads</span>
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {riskyPayments.map((payment) => (
                <li key={payment._id} className="px-8 py-6 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{payment.purpose}</h3>
                      <p className="text-gray-600 mb-2">
                        EMI: ₹{payment.emiAmount?.toLocaleString() || 'N/A'} | 
                        Paid: {payment.emisPaid}/{payment.totalEmis || 'N/A'}
                      </p>
                      <p className="text-red-600 font-medium">
                        Due: {new Date(payment.nextDueDate || '').toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right ml-6">
                      <p className="text-2xl font-bold text-gray-900 mb-2">
                        ₹{payment.totalAmount?.toLocaleString() || 'N/A'}
                      </p>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full mb-3 inline-block ${
                        payment.status === 'critical' ? 'bg-red-100 text-red-800' :
                        payment.status === 'delayed' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {payment.status.toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleRecordPayment(payment._id!)}
                        className="block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Record Payment
                      </button>
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