// pages/index.tsx
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8 flex flex-col items-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">Welcome, Leaps & Rebounds</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Your comprehensive platform for business insights and analysis.
          </p>
        </div>

        <div className="flex justify-center w-full">
          <Button 
            onClick={() => router.push("/details/1")} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg flex items-center gap-2 transition-all"
          >
            Launch Application
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="text-gray-500 text-sm mt-12">
          Built by: @jgx02 v0.1.10
        </div>
      </div>
    </div>
  );
};

export default HomePage;