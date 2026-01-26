"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { quotationService } from "@/services/quotationService";
import { leadService } from "@/services/leadService";

export default function NewQuotationForm() {
  const [brokerName, setBrokerName] = useState("");
  const [propertySummary, setPropertySummary] = useState("");
  const [quotedPrice, setQuotedPrice] = useState("");
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
        brokerName,
        propertySummary,
        quotedPrice: Number(quotedPrice)
      };

      await quotationService.create(payload);
      router.push("/quotations");
    } catch (error: any) {
      setError(error.message || "Failed to create quotation");
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
              Create Quotation {leadName && `for ${leadName}`}
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
                <span className="label-text font-medium text-base-content">Broker Name</span>
              </label>
              <input
                type="text"
                id="brokerName"
                value={brokerName}
                onChange={(e) => setBrokerName(e.target.value)}
                required
                className="input input-bordered w-full focus:input-success"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">Property Summary</span>
              </label>
              <textarea
                id="propertySummary"
                value={propertySummary}
                onChange={(e) => setPropertySummary(e.target.value)}
                rows={4}
                className="textarea textarea-bordered w-full focus:textarea-success"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content">Quoted Price</span>
              </label>
              <input
                type="number"
                id="quotedPrice"
                value={quotedPrice}
                onChange={(e) => setQuotedPrice(e.target.value)}
                required
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
                {loading ? "Creating..." : "Create Quotation"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}