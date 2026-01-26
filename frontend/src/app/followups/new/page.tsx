"use client";

import { Suspense } from "react";
import NewFollowUpForm from "./NewFollowUpForm";

export default function NewFollowUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewFollowUpForm />
    </Suspense>
  );
}