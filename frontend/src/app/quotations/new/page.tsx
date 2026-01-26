"use client";

import { Suspense } from "react";
import NewQuotationForm from "./NewQuotationForm";

export default function NewQuotationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-base-100"><div className="loading loading-spinner loading-lg text-primary"></div></div>}>
      <NewQuotationForm />
    </Suspense>
  );
}