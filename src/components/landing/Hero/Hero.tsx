import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Wand2,
  Bot
} from 'lucide-react';

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
  const [websiteUrl, setWebsiteUrl] = useState('');

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

  const handleStartScan = () => {
    if (websiteUrl) {
      router.push(`/scan?url=${encodeURIComponent(websiteUrl)}`);
    }
  };

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
          AI Agents that Master
          <br />
          Your SEO Strategy
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
          Deploy intelligent agents that automatically optimize your SEO, track competitors, 
          and adjust your strategy in real-time. Never fall behind in search rankings again.
        </p>

        <div className="mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <p className="text-xl md:text-2xl text-gray-300">Integrates with</p>
            <span className={`text-xl md:text-2xl font-semibold bg-gradient-to-r ${platforms[platformIndex].color} bg-clip-text text-transparent`}>
              {currentPlatform}
            </span>
            <span className="text-xl md:text-2xl animate-pulse">|</span>
          </div>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
              <Bot className="w-8 h-8 text-indigo-400" />
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 animate-bounce" />
            <div className={`w-16 h-16 bg-gradient-to-r ${platforms[platformIndex].color} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold">{platforms[platformIndex].name[0]}</span>
            </div>
          </div>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              placeholder="Enter your website URL"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="flex-1 h-14 px-4 rounded-lg bg-white/90 border border-gray-300 
                         text-gray-900 text-lg placeholder-gray-500 
                         focus:outline-none focus:border-indigo-500"
            />
            <Button
              size="lg"
              className="h-14 px-8 bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-semibold whitespace-nowrap"
              onClick={handleStartScan}
            >
              <span className="flex items-center">
                Get Free SEO Scan
                <ArrowRight className="w-5 h-5 ml-2" />
              </span>
            </Button>
          </div>
          <p className="text-gray-400">
            Instant analysis • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;