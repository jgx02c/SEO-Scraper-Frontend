import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { submitWebsiteForAnalysis, checkAnalysisStatus, WebsiteApiError } from "@/api/website-api";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Bot, Rocket } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToastHelpers } from "@/components/ui/toast";

import type { ScanStatus } from '@/types/api';

const OnboardingPage = () => {
  const router = useRouter();
  const { success, error: showError, info } = useToastHelpers();
  const [step, setStep] = useState(1);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [scanStatus, setScanStatus] = useState<ScanStatus>({
    pages_scanned: 0,
    total_pages: 0,
    current_step: "",
    estimated_time_remaining: 300,
    progress_percentage: 0
  });
  
  const totalSteps = 3;
  const POLLING_INTERVAL = 5000; // 5 seconds
  
  // Setup polling effect
  useEffect(() => {
    let pollTimer: NodeJS.Timeout | null = null;
    
    const poll = async () => {
      console.log('Starting poll iteration, isProcessing:', isProcessing);
      if (!isProcessing) return;

      try {
        const data = await checkAnalysisStatus();
        console.log('Poll response data:', data);
        
        if (!data.success) {
          console.error('Poll response indicates failure:', data);
          throw new Error(data.error || 'Failed to check status');
        }

        // Update scan status with the new API response format
        setScanStatus({
          pages_scanned: data.pages_scanned || 0,
          total_pages: data.total_pages || 0,
          current_step: data.current_step || "Starting scan...",
          estimated_time_remaining: data.estimated_time_remaining || 300,
          progress_percentage: data.progress_percentage || 0
        });

        // Check the status field directly (new API format)
        const currentStatus = data.status;
        console.log('Current scan status:', currentStatus);

        if (currentStatus === 'completed') {
          console.log('Analysis complete, showing completion screen');
          success('Website analysis completed successfully!', 'Analysis Complete');
          setIsProcessing(false);
          setStep(3); // Move to completion screen instead of redirecting immediately
        } else if (currentStatus === 'error') {
          console.error('Scan reported error status:', data.error_message);
          const errorMsg = data.error_message || 'An error occurred during processing';
          showError(errorMsg, 'Analysis Error');
          setError(errorMsg);
          setIsProcessing(false);
        } else if (currentStatus === 'crawling' || currentStatus === 'processing') {
          console.log('Processing continues, scheduling next poll');
          pollTimer = setTimeout(poll, POLLING_INTERVAL);
        } else {
          console.log('Unknown status, continuing to poll:', currentStatus);
          pollTimer = setTimeout(poll, POLLING_INTERVAL);
        }
      } catch (err) {
        console.error('Error during poll:', err);
        
        if (err instanceof WebsiteApiError && err.status === 401) {
          showError('Your session has expired. Please sign in again.', 'Authentication Error');
          router.push('/signin');
          setIsProcessing(false);
          return;
        }

        // Don't stop polling on temporary errors, unless isProcessing is false
        if (isProcessing) {
          console.log('Scheduling retry despite error');
          pollTimer = setTimeout(poll, POLLING_INTERVAL);
        }
      }
    };

    if (isProcessing) {
      console.log('Initial poll setup');
      poll();
    }

    return () => {
      if (pollTimer) {
        console.log('Cleaning up poll timer');
        clearTimeout(pollTimer);
      }
    };
  }, [isProcessing, router]);

  const handleUrlSubmit = async () => {
    if (!websiteUrl) {
      const errorMsg = "Please enter your website URL";
      setError(errorMsg);
      showError(errorMsg, "URL Required");
      return false;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      console.log('Submitting website for analysis:', websiteUrl);
      info('Starting website analysis...', 'Analysis Started');
      
      const result = await submitWebsiteForAnalysis(websiteUrl);
      console.log('Submission result:', result);
      
      if (!result.success) {
        console.error('Submission failed:', result.error);
        const errorMsg = result.error || 'Submission failed';
        showError(errorMsg, 'Analysis Failed');
        throw new Error(errorMsg);
      }

      console.log('Setting processing state to true');
      success('Website submitted successfully! Analysis is starting...', 'Submission Complete');
      setIsProcessing(true);
      return true;
    } catch (err) {
      console.error('Error during submission:', err);
      
      if (err instanceof WebsiteApiError) {
        // Handle specific API errors
        switch (err.status) {
          case 400:
            showError('Invalid website URL. Please check and try again.', 'Invalid URL');
            setError('Invalid website URL. Please check and try again.');
            break;
          case 401:
            showError('Authentication expired. Please sign in again.', 'Authentication Error');
            setError('Authentication expired. Please sign in again.');
            router.push('/signin');
            break;
          case 404:
            showError('User profile not found. Please try signing in again.', 'Profile Error');
            setError('User profile not found. Please try signing in again.');
            break;
          case 429:
            showError('Too many requests. Please wait before trying again.', 'Rate Limited');
            setError('Too many requests. Please wait before trying again.');
            break;
          default:
            showError(err.message, 'Analysis Failed');
            setError(err.message);
        }
      } else {
        const errorMsg = err instanceof Error ? err.message : "Failed to submit website. Please try again.";
        showError(errorMsg, 'Submission Error');
        setError(errorMsg);
      }
      
      setIsLoading(false);
      return false;
    }
  };

  const formatTimeRemaining = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleNext = async () => {
    console.log('handleNext called, current step:', step);
    
    if (step === 2 && !websiteUrl) {
      setError("Please enter your website URL");
      return;
    }
    
    if (step === 2) {
      console.log('Attempting URL submission');
      const success = await handleUrlSubmit();
      console.log('URL submission result:', success);
      if (success) {
        console.log('Moving to next step');
        setStep(step + 1);
      }
    } else if (step === 3) {
      console.log('Redirecting to dashboard');
      router.push("/dashboard");
    } else {
      console.log('Moving to next step');
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

  // Processing screen with detailed status
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-8 text-center">
          <Bot className="w-16 h-16 text-blue-400 mx-auto animate-pulse" />
          <h2 className="text-2xl font-bold text-white">Analyzing Your Website</h2>
          
          <div className="space-y-4">
            <p className="text-gray-400">
              Current Step: {scanStatus.current_step}
            </p>
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Pages Scraped: {scanStatus.pages_scanned}</span>
                <span>Pages Discovered: {scanStatus.total_pages || 'Discovering...'}</span>
              </div>
              <Progress 
                value={scanStatus.progress_percentage}
                className="w-full h-2 bg-gray-700"
              />
              <div className="text-center text-xs text-gray-500 mt-1">
                {scanStatus.progress_percentage}% complete
              </div>
            </div>
            
            {scanStatus.estimated_time_remaining > 0 && (
              <p className="text-gray-400">
                Estimated Time Remaining: {formatTimeRemaining(scanStatus.estimated_time_remaining)}
              </p>
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
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
              <h2 className="text-2xl font-bold text-white text-center">Let&apos;s Analyze Your Website</h2>
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
              <h2 className="text-2xl font-bold text-white text-center">✅ Analysis Complete!</h2>
              <p className="text-gray-400 text-center">
                Your website analysis has been completed successfully. You can now view your comprehensive SEO report and insights in the dashboard.
              </p>
              <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-lg">
                <h3 className="text-green-400 font-semibold mb-2">Analysis Results Ready</h3>
                <p className="text-gray-400 text-sm">
                  Your full website analysis, competitor insights, and AI-powered recommendations are now available in your dashboard.
                </p>
              </div>
            </div>
          )}

          <Button
            onClick={handleNext}
            disabled={step === 2 && isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg transition-all duration-200 ease-in-out flex items-center justify-center space-x-2"
          >
            <span>
              {step === 2 && isLoading ? "Processing..." : 
               step === totalSteps ? "Go to Dashboard" : 
               step === 2 ? "Start Analysis" : "Continue"}
            </span>
            {step === 2 && isLoading && (
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