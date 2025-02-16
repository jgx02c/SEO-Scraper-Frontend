import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { heroData } from "./data";
import { LogoSlider } from './LogoSlider';

export const Hero = () => {
  const router = useRouter();
  const [currentFeature, setCurrentFeature] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [featureIndex, setFeatureIndex] = useState(0);
  const [delta, setDelta] = useState(200);

  const {
    badge,
    title,
    features,
    description,
    primaryButton,
    secondaryButton,
    trustText
  } = heroData;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [currentFeature, isDeleting, featureIndex]);

  const tick = () => {
    const currentWord = features[featureIndex];
    
    if (!isDeleting && currentFeature.length < currentWord.length) {
      setCurrentFeature(currentWord.substring(0, currentFeature.length + 1));
      setDelta(100);
    } else if (isDeleting && currentFeature.length > 0) {
      setCurrentFeature(currentFeature.substring(0, currentFeature.length - 1));
      setDelta(50);
    } else if (isDeleting && currentFeature.length === 0) {
      setIsDeleting(false);
      setFeatureIndex((prev) => (prev + 1) % features.length);
      setDelta(500);
    } else if (!isDeleting && currentFeature.length === currentWord.length) {
      setIsDeleting(true);
      setDelta(2000);
    }
  };

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block px-4 py-2 bg-blue-900/30 rounded-full text-blue-400 mb-4">
          {badge}
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 flex flex-col items-center justify-center">
          <span>{title.start}</span>
          <span className="text-indigo-600 h-[1.2em] flex items-center">
            {currentFeature}
            <span className="animate-pulse ml-1">|</span>
          </span>
        </h1>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            variant="purple"
            onClick={() => router.push(primaryButton.link)}
            size="lg"
            className="text-base font-semibold"
          >
            {primaryButton.text}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(secondaryButton.link)}
            size="lg"
            className="text-indigo-600 border-indigo-600 hover:bg-indigo-600/10"
          >
            {secondaryButton.text}
          </Button>
        </div>

        <div className="text-gray-400 text-sm mb-8">
          {trustText}
        </div>
        
        <LogoSlider />
      </div>
    </section>
  );
};