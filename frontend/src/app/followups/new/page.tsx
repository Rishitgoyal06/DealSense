"use client";

import { Suspense } from "react";
import NewFollowUpForm from "./NewFollowUpForm";

export default function NewFollowUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-base-100"><div className="loading loading-spinner loading-lg text-primary"></div></div>}>
      <NewFollowUpForm />
    </Suspense>
  );
}