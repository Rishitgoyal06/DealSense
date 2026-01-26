import { Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import NewQuotationForm from "./NewQuotationForm";

export default function NewQuotationPage() {
  return (
    <Suspense fallback={<LoadingScreen message="Loading form..." />}>
      <NewQuotationForm />
    </Suspense>
  );
}