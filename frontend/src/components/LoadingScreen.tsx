import { MapPinHouse } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
      <div className="text-center">
        {/* Logo with animation */}
        <div className="mb-8 animate-pulse">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-4" 
               style={{ backgroundColor: "#166534" }}>
            <MapPinHouse size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-base-content mb-2">DealSense</h1>
          <p className="text-base-content/70">Real Estate CRM</p>
        </div>

        {/* Loading message */}
        <p className="text-base-content/80 font-medium">{message}</p>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  );
}