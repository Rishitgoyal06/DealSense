"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { paymentService } from "@/services/paymentService";
import { leadService } from "@/services/leadService";

export default function NewPaymentForm() {
  const [purpose, setPurpose] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [emiAmount, setEmiAmount] = useState("");
  const [totalEmis, setTotalEmis] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");
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
        purpose,
        totalAmount: totalAmount ? Number(totalAmount) : undefined,
        emiAmount: emiAmount ? Number(emiAmount) : undefined,
        totalEmis: totalEmis ? Number(totalEmis) : undefined,
        nextDueDate: nextDueDate || undefined
      };

      await paymentService.create(payload);
      router.push("/payments");
    } catch (error: any) {
      setError(error.message || "Failed to create payment schedule");
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
              Create Payment Schedule {leadName && `for ${leadName}`}
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
                <span className="label-text font-medium text-base-content">Purpose</span>
              </label>
              <input
                type="text"
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
                placeholder="e.g., Property Purchase, Loan EMI"
                className="input input-bordered w-full focus:input-success"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/70">Total Amount (Optional)</span>
              </label>
              <input
                type="number"
                id="totalAmount"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                className="input input-bordered w-full focus:input-success"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/70">EMI Amount (Optional)</span>
              </label>
              <input
                type="number"
                id="emiAmount"
                value={emiAmount}
                onChange={(e) => setEmiAmount(e.target.value)}
                className="input input-bordered w-full focus:input-success"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/70">Total EMIs (Optional)</span>
              </label>
              <input
                type="number"
                id="totalEmis"
                value={totalEmis}
                onChange={(e) => setTotalEmis(e.target.value)}
                className="input input-bordered w-full focus:input-success"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/70">Next Due Date (Optional)</span>
              </label>
              <input
                type="date"
                id="nextDueDate"
                value={nextDueDate}
                onChange={(e) => setNextDueDate(e.target.value)}
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
                {loading ? "Creating..." : "Create Payment Schedule"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}