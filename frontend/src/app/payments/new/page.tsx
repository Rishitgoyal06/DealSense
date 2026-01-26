"use client";

import { Suspense } from "react";
import NewPaymentFormComponent from "./NewPaymentFormComponent";

export default function NewPaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-base-100"><div className="loading loading-spinner loading-lg text-primary"></div></div>}>
      <NewPaymentFormComponent />
    </Suspense>
  );
}