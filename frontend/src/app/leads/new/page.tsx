"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPinHouse, ArrowLeft, UserPlus, Phone, Building, DollarSign, MapPin } from "lucide-react";
import { leadService } from "@/services/leadService";
import ThemeToggle from "@/components/ThemeToggle";

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
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      <header className="bg-base-100 shadow-lg border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: "#166534" }}>
                <MapPinHouse size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-base-content">Add New Lead</h1>
                <p className="text-sm text-base-content/70">Create a new lead in your CRM</p>
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
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #166534 0%, #14532D 100%)" }}>
                <UserPlus size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-base-content">Lead Information</h2>
                <p className="text-sm text-base-content/70">Fill in the details to create a new lead</p>
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
                  <span className="label-text font-medium flex items-center gap-2 text-base-content">
                    <UserPlus size={16} />
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter lead's full name"
                  className="input input-bordered w-full focus:input-success"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2 text-base-content">
                    <Phone size={16} />
                    Phone
                  </span>
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="Enter phone number"
                  className="input input-bordered w-full focus:input-success"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2 text-base-content">
                    <Building size={16} />
                    Lead Type
                  </span>
                </label>
                <select
                  id="leadType"
                  value={leadType}
                  onChange={(e) => setLeadType(e.target.value as 'buy' | 'rent' | 'sell' | 'club')}
                  className="select select-bordered w-full focus:select-success"
                >
                  <option value="buy">Buy Property</option>
                  <option value="rent">Rent Property</option>
                  <option value="sell">Sell Property</option>
                  <option value="club">Investment Club</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-base-content">Requirement Details</span>
                </label>
                <textarea
                  id="requirement"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe the lead's property requirements in detail..."
                  className="textarea textarea-bordered w-full focus:textarea-success"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2 text-base-content">
                      <DollarSign size={16} />
                      Budget
                    </span>
                  </label>
                  <input
                    type="number"
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                    placeholder="Primary budget"
                    className="input input-bordered w-full focus:input-success"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-base-content/70">Budget Min (Optional)</span>
                  </label>
                  <input
                    type="number"
                    id="budgetMin"
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(e.target.value)}
                    placeholder="Minimum budget"
                    className="input input-bordered w-full focus:input-success"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-base-content/70">Budget Max (Optional)</span>
                  </label>
                  <input
                    type="number"
                    id="budgetMax"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(e.target.value)}
                    placeholder="Maximum budget"
                    className="input input-bordered w-full focus:input-success"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2 text-base-content">
                    <MapPin size={16} />
                    Preferred Locations
                  </span>
                  <span className="label-text-alt text-base-content/60">Comma-separated</span>
                </label>
                <input
                  type="text"
                  id="preferredLocations"
                  value={preferredLocations}
                  onChange={(e) => setPreferredLocations(e.target.value)}
                  placeholder="e.g., Bandra, Andheri, Juhu"
                  className="input input-bordered w-full focus:input-success"
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
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      Create Lead
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