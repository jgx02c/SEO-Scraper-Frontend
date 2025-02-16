// pages/index.tsx
import Head from "next/head";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Dashboard } from "@/components/landing/Dashboard";
import { Reports } from "@/components/landing/Reports";
import { ChatSection } from "@/components/landing/ChatSection";
import { CompetitorTracker } from "@/components/landing/CompetitorTracker";
import { AdCampaigns } from "@/components/landing/AdCampaigns";
import { ContentAnalysis } from "@/components/landing/ContentAnalysis";
import { AIAutomation } from "@/components/landing/AIAutomation";
import { CTA } from "@/components/landing/CTA";
import { useEffect, useRef } from "react";

const HomePage = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const opacity = entry.intersectionRatio;
        const scale = 0.9 + (entry.intersectionRatio * 0.1);
        const translateY = (1 - entry.intersectionRatio) * 20;
        
        if (entry.target instanceof HTMLElement) {
          entry.target.style.opacity = opacity.toString();
          entry.target.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Scope Labs | AI-Powered Digital Competition Analysis</title>
        <meta 
          name="description" 
          content="Dominate your market with Scope Labs' AI-powered competitor analysis, content generation, and automated optimizations. Stay ahead with real-time insights and automated implementations."
        />
        <meta 
          name="keywords" 
          content="competitor analysis, AI automation, content generation, website optimization, digital strategy, market intelligence"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Header />

        {/* Hero Section */}
        <div className="relative z-10">
          <Hero />
        </div>

        {/* Scrolling Container */}
        <div ref={scrollContainerRef} className="relative">
          {/* AI Intelligence Section */}
          <div className="scroll-section transition-all duration-700 ease-in-out">
            <CompetitorTracker />
          </div>

          <div className="scroll-section transition-all duration-700 ease-in-out">
            <AdCampaigns />
          </div>

          {/* AI Implementation Section */}
          <div className="scroll-section transition-all duration-700 ease-in-out">
            <ContentAnalysis />
          </div>

          <div className="scroll-section transition-all duration-700 ease-in-out">
            <AIAutomation />
          </div>

          {/* Website Tools Section */}
          <div className="scroll-section transition-all duration-700 ease-in-out">
            <Features />
          </div>

          <div className="scroll-section transition-all duration-700 ease-in-out">
            <ChatSection />
          </div>

          <div className="scroll-section transition-all duration-700 ease-in-out">
            <Dashboard />
          </div>

          <div className="scroll-section transition-all duration-700 ease-in-out">
            <Reports />
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative z-10">
          <CTA />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;