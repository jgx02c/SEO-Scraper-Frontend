import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  Scan, 
  Rocket, 
  Shield, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  FileText,
  Search
} from 'lucide-react';

const scanSteps = [
  { title: 'Technical Analysis', icon: Shield },
  { title: 'Content Audit', icon: FileText },
  { title: 'SEO Evaluation', icon: Search },
  { title: 'Performance Check', icon: Zap }
];

export const CTA = () => {
  const router = useRouter();
  const [scanUrl, setScanUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const startScan = () => {
    if (!scanUrl) return;
    setScanning(true);
    
    // Simulate scan steps
    let step = 0;
    const interval = setInterval(() => {
      if (step < scanSteps.length - 1) {
        step++;
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        router.push('/dashboard');
      }
    }, 1500);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-indigo-500/10 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full text-indigo-400 mb-4 space-x-2">
              <Bot className="w-4 h-4" />
              <span>AI-Powered Integration</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Deploy Your AI SEO Team Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get a personalized AI team that seamlessly integrates with your website and starts optimizing immediately.
            </p>
          </div>

          {/* Website Scanner */}
          <div className="relative overflow-hidden rounded-lg mb-12">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
            <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
            <div className="relative p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Free Website Analysis</h3>
                <p className="text-gray-400">Get an instant AI-powered analysis of your website's potential</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter your website URL"
                    value={scanUrl}
                    onChange={(e) => setScanUrl(e.target.value)}
                    className="w-full px-4 h-12 leading-normal bg-white/90 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    style={{ lineHeight: '48px' }}
                  />
                </div>
                <Button
                  onClick={startScan}
                  disabled={scanning || !scanUrl}
                  className="h-12 px-6 bg-indigo-600 hover:bg-indigo-500 inline-flex items-center justify-center text-base"
                >
                  {scanning ? (
                    <span className="flex items-center">
                      <Scan className="w-4 h-4 mr-2 animate-pulse" />
                      Analyzing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Start Free Scan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
                  )}
                </Button>
              </div>

              {scanning && (
                <div className="mt-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {scanSteps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = index === currentStep;
                      const isComplete = index < currentStep;
                      return (
                        <div
                          key={index}
                          className={`relative p-4 rounded-lg transition-all duration-300 ${
                            isActive ? 'ring-2 ring-indigo-500' : ''
                          }`}
                        >
                          <div className="absolute inset-0 rounded-lg bg-gray-900/50 backdrop-blur-sm" />
                          <div className={`absolute inset-0 rounded-lg ${
                            isComplete ? 'bg-green-500/5' : isActive ? 'bg-indigo-500/5' : 'bg-gray-800/5'
                          }`} />
                          <div className="relative flex items-center justify-center">
                            <div className={`p-2 rounded-lg ${
                              isComplete ? 'text-green-400' : isActive ? 'text-indigo-400' : 'text-gray-500'
                            }`}>
                              {isComplete ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                              )}
                            </div>
                            <span className={`ml-2 font-medium ${
                              isComplete ? 'text-green-400' : isActive ? 'text-white' : 'text-gray-500'
                            }`}>
                              {step.title}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="relative p-6 rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
              <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
              <div className="relative">
                <Rocket className="w-8 h-8 text-indigo-400 mb-4" />
                <h3 className="text-white font-medium mb-2">Instant Integration</h3>
                <p className="text-gray-400 text-sm">Your AI team starts working immediately with zero setup required</p>
              </div>
            </div>

            <div className="relative p-6 rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
              <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
              <div className="relative">
                <Bot className="w-8 h-8 text-indigo-400 mb-4" />
                <h3 className="text-white font-medium mb-2">24/7 Optimization</h3>
                <p className="text-gray-400 text-sm">Continuous monitoring and improvements around the clock</p>
              </div>
            </div>

            <div className="relative p-6 rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5" />
              <div className="absolute inset-0 border border-gray-700/50 rounded-lg" />
              <div className="relative">
                <Zap className="w-8 h-8 text-indigo-400 mb-4" />
                <h3 className="text-white font-medium mb-2">Real Results</h3>
                <p className="text-gray-400 text-sm">Average 43% increase in organic traffic within 3 months</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-700/50 pt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">250+</div>
              <div className="text-gray-400">Websites Optimized</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">43%</div>
              <div className="text-gray-400">Average Traffic Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">AI-Powered Optimization</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;