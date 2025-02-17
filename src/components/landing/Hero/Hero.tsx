import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wand2 } from 'lucide-react';

const platforms = [
  { name: 'Shopify', color: 'from-green-400 to-green-600' },
  { name: 'Wix', color: 'from-blue-400 to-blue-600' },
  { name: 'Squarespace', color: 'from-yellow-200 to-orange-400' },
  { name: 'WordPress', color: 'from-purple-400 to-purple-600' }
];

export const Hero = () => {
  const router = useRouter();
  const [currentPlatform, setCurrentPlatform] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [platformIndex, setPlatformIndex] = useState(0);
  const [delta, setDelta] = useState(200);
  const [showIntegration, setShowIntegration] = useState(false);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [currentPlatform, isDeleting, platformIndex]);

  const tick = () => {
    const currentWord = platforms[platformIndex].name;
    
    if (!isDeleting && currentPlatform.length < currentWord.length) {
      setCurrentPlatform(currentWord.substring(0, currentPlatform.length + 1));
      setDelta(100);
      setShowIntegration(true);
    } else if (isDeleting && currentPlatform.length > 0) {
      setCurrentPlatform(currentPlatform.substring(0, currentPlatform.length - 1));
      setDelta(50);
      setShowIntegration(false);
    } else if (isDeleting && currentPlatform.length === 0) {
      setIsDeleting(false);
      setPlatformIndex((prev) => (prev + 1) % platforms.length);
      setDelta(500);
    } else if (!isDeleting && currentPlatform.length === currentWord.length) {
      setIsDeleting(true);
      setDelta(2000);
    }
  };

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 rounded-full text-indigo-400 mb-4 space-x-2">
          <Wand2 className="w-4 h-4" />
          <span>AI-Powered SEO Team</span>
        </div>
        
        <div className="relative mb-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Your SEO Team That
          </h1>
          <div className="h-20 flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <span className="text-5xl md:text-6xl font-bold text-white">Integrates with</span>
              <div className="relative h-16">
                <span className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${platforms[platformIndex].color} bg-clip-text text-transparent`}>
                  {currentPlatform}
                </span>
                <span className="animate-pulse ml-1 text-5xl md:text-6xl font-bold text-white">|</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-500 transform ${showIntegration ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-center space-x-4 mb-12">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
              <Wand2 className="w-8 h-8 text-indigo-400" />
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 animate-bounce" />
            <div className={`w-16 h-16 bg-gradient-to-r ${platforms[platformIndex].color} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold">{platforms[platformIndex].name[0]}</span>
            </div>
          </div>
        </div>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          Deploy your personalized AI SEO team that seamlessly integrates with your existing website. Get expert optimization, content strategy, and ranking improvements without changing platforms.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            variant="default"
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-base font-semibold"
            onClick={() => router.push('/signup')}
          >
            Start Free Trial
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-indigo-400 border-indigo-400 hover:bg-indigo-400/10 text-base font-semibold"
            onClick={() => router.push('/demo')}
          >
            Watch Demo
          </Button>
        </div>

        <div className="text-gray-400 text-sm">
          Trusted by growing businesses worldwide • No credit card required
        </div>
      </div>
    </section>
  );
};

export default Hero;