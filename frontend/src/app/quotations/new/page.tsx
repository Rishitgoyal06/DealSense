"use client";

import { Suspense } from "react";
import NewQuotationForm from "./NewQuotationForm";

export default function NewQuotationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewQuotationForm />
    </Suspense>
  );
}