import { useState } from "react";
import { useRouter } from "next/router";
import { submitWebsiteForAnalysis } from "./api/onboardingAPI";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Bot, Rocket } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const OnboardingPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const totalSteps = 3;

  const handleUrlSubmit = async () => {
    if (!websiteUrl) {
      setError("Please enter your website URL");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const result = await submitWebsiteForAnalysis(websiteUrl);
      
      if (!result.success) {
        throw new Error(result.error);
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit website. Please try again.");
      setIsLoading(false);
      return false;
    }
  };

  const checkProcessingStatus = async () => {
    try {
      const response = await fetch('/api/check-status');
      const data = await response.json();

      if (data.status === 'complete') {
        router.push("/dashboard");
      } else if (data.status === 'processing') {
        // Check again after 30 seconds
        setTimeout(checkProcessingStatus, 30000);
      } else {
        throw new Error('Processing failed');
      }
    } catch (err) {
      setError("Error checking status. Please contact support.");
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  const handleNext = () => {
    if (step === 2 && !websiteUrl) {
      setError("Please enter your website URL");
      return;
    }
    
    if (step === 2) {
      handleUrlSubmit().then(() => {
        setStep(step + 1);
      });
    } else if (step === 3) {
      router.push("/dashboard");
    } else {
      setStep(step + 1);
    }
  };

  const renderStepIcon = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return <Rocket className="w-12 h-12 text-blue-400" />;
      case 2:
        return <LineChart className="w-12 h-12 text-blue-400" />;
      case 3:
        return <Bot className="w-12 h-12 text-blue-400" />;
      default:
        return null;
    }
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-8 text-center">
          <Bot className="w-16 h-16 text-blue-400 mx-auto animate-pulse" />
          <h2 className="text-2xl font-bold text-white">Preparing Your Dashboard</h2>
          <p className="text-gray-400">
            We're analyzing your website and gathering competitive insights. 
            This process typically takes 5-10 minutes. You'll be automatically 
            redirected when it's ready.
          </p>
          <div className="w-full max-w-md mx-auto">
            <Progress 
              value={100}
              className="w-full h-2 bg-gray-700 animate-pulse"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Scope Labs</h1>
          <p className="text-gray-400">AI-Powered Digital Competition Analysis</p>
        </div>

        <Progress 
          value={(step / totalSteps) * 100} 
          className="w-full h-2 bg-gray-700"
        />

        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg space-y-8 border border-gray-700">
          <div className="flex justify-center mb-6">
            {renderStepIcon(step)}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white text-center">Welcome to Scope Labs</h2>
              <p className="text-gray-400 text-center">
                Get ready to transform your digital strategy with AI-powered competitor analysis and automation.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Real-time Analysis</h3>
                  <p className="text-gray-400 text-sm">Track competitor movements as they happen</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">AI Automation</h3>
                  <p className="text-gray-400 text-sm">Implement optimizations automatically</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white text-center">Let's Analyze Your Website</h2>
              <p className="text-gray-400 text-center">
                Enter your website URL to begin the competitive analysis.
              </p>
              <div className="space-y-4">
                <Input
                  type="url"
                  placeholder="https://your-website.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full bg-gray-900 border-gray-700 text-white"
                />
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white text-center">Analysis in Progress</h2>
              <p className="text-gray-400 text-center">
                Your website analysis has begun. You can now proceed to your dashboard.
              </p>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Initial Setup Complete</h3>
                <p className="text-gray-400 text-sm">
                  While your full analysis may take 5-10 minutes to complete, you can start exploring your dashboard now.
                </p>
              </div>
            </div>
          )}

          <Button
            onClick={handleNext}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg transition-all duration-200 ease-in-out flex items-center justify-center space-x-2"
          >
            <span>
              {isLoading ? "Processing..." : 
               step === totalSteps ? "Go to Dashboard" : 
               step === 2 ? "Start Analysis" : "Continue"}
            </span>
            {isLoading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </Button>
        </div>

        <div className="text-center text-gray-500 text-sm">
          Step {step} of {totalSteps}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;