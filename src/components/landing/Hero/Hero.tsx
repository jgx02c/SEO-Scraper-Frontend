// components/landing/Hero/Hero.tsx
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { heroData } from "./data";

export const Hero = () => {
  const router = useRouter();
  const { 
    badge, 
    title, 
    description, 
    primaryButton, 
    secondaryButton, 
    trustText 
  } = heroData;

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block px-4 py-2 bg-blue-900/30 rounded-full text-blue-400 mb-4">
          {badge}
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          {title.start} <span className="text-blue-500">{title.highlight}</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            onClick={() => router.push(primaryButton.link)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg transition-all"
          >
            {primaryButton.text}
          </Button>
          <Button 
            onClick={() => router.push(secondaryButton.link)} 
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-6 text-lg rounded-lg transition-all"
          >
            {secondaryButton.text}
          </Button>
        </div>
        <div className="text-gray-400 text-sm">
          {trustText}
        </div>
      </div>
    </section>
  );
};