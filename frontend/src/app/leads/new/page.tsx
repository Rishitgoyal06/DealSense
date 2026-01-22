"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { leadService } from "@/services/leadService";

export default function NewLeadPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [requirement, setRequirement] = useState("");
  const [budget, setBudget] = useState("");
  const [leadType, setLeadType] = useState<'buy' | 'rent' | 'sell' | 'club'>('buy');
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [preferredLocations, setPreferredLocations] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        name,
        phone,
        requirement,
        budget: Number(budget),
        leadType,
        budgetMin: budgetMin ? Number(budgetMin) : undefined,
        budgetMax: budgetMax ? Number(budgetMax) : undefined,
        preferredLocations: preferredLocations.split(',').map(loc => loc.trim()).filter(loc => loc)
      };

      await leadService.create(payload);
      router.push("/leads");
    } catch (error: any) {
      setError(error.message || "Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Add New Lead</h1>
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="leadType" className="block text-sm font-medium text-gray-700">
                Lead Type
              </label>
              <select
                id="leadType"
                value={leadType}
                onChange={(e) => setLeadType(e.target.value as 'buy' | 'rent' | 'sell' | 'club')}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
                <option value="sell">Sell</option>
                <option value="club">Club</option>
              </select>
            </div>

            <div>
              <label htmlFor="requirement" className="block text-sm font-medium text-gray-700">
                Requirement
              </label>
              <textarea
                id="requirement"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                required
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Budget
                </label>
                <input
                  type="number"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="budgetMin" className="block text-sm font-medium text-gray-700">
                  Budget Min (Optional)
                </label>
                <input
                  type="number"
                  id="budgetMin"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="budgetMax" className="block text-sm font-medium text-gray-700">
                  Budget Max (Optional)
                </label>
                <input
                  type="number"
                  id="budgetMax"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="preferredLocations" className="block text-sm font-medium text-gray-700">
                Preferred Locations (comma-separated)
              </label>
              <input
                type="text"
                id="preferredLocations"
                value={preferredLocations}
                onChange={(e) => setPreferredLocations(e.target.value)}
                placeholder="e.g., Bandra, Andheri, Juhu"
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
                {loading ? "Creating..." : "Create Lead"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}