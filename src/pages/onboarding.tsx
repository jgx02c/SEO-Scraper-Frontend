import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const OnboardingPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        <Progress value={(step / totalSteps) * 100} className="w-full bg-gray-700" />

        <div className="bg-gray-800 p-8 rounded-lg space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Welcome to Leaps &amp; Rebounds</h2>
              <p className="text-gray-400">Let&apos;s get your account set up for success.</p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Customize Your Experience</h2>
              <p className="text-gray-400">Tell us about your business preferences.</p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">You&apos;re Almost There!</h2>
              <p className="text-gray-400">Final steps to complete your setup.</p>
            </div>
          )}

          <Button
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
          >
            {step === totalSteps ? "Complete Setup" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;