"use client";

import { Suspense } from "react";
import NewPaymentFormComponent from "./NewPaymentFormComponent";

export default function NewPaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPaymentFormComponent />
    </Suspense>
  );
}