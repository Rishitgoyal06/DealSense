import { Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import NewPaymentFormComponent from "./NewPaymentFormComponent";

export default function NewPaymentPage() {
  return (
    <Suspense fallback={<LoadingScreen message="Loading form..." />}>
      <NewPaymentFormComponent />
    </Suspense>
  );
}