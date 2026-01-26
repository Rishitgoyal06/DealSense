import { Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import NewFollowUpForm from "./NewFollowUpForm";

export default function NewFollowUpPage() {
  return (
    <Suspense fallback={<LoadingScreen message="Loading form..." />}>
      <NewFollowUpForm />
    </Suspense>
  );
}