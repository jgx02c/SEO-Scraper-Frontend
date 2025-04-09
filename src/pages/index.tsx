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
import  BackgroundPattern  from "@/components/layout/background";
import { useEffect, useRef } from "react";
import IntegrationCard from "@/components/IntegrationCard";

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
        <title>Scope Labs | AI-Powered SEO Team Integration</title>
        <meta 
          name="description" 
          content="Deploy your personalized AI SEO team that seamlessly integrates with your existing website. Get expert optimization and ranking improvements without changing platforms."
        />
        <meta 
          name="keywords" 
          content="SEO integration, AI SEO, website optimization, digital strategy, content optimization, Shopify SEO, Wix SEO, Squarespace SEO, WordPress SEO"
        />
      </Head>

      <div className="relative min-h-screen">
        {/* Background Pattern */}
        <BackgroundPattern />
        
        {/* Content Container */}
        <div className="relative z-10">
          <Header />

          {/* Hero Section */}
          <div className="relative">
            <Hero />
          </div>

          {/* Scrolling Container */}
          <div ref={scrollContainerRef} className="relative">

            <div className="scroll-section transition-all duration-700 ease-in-out">
              <IntegrationCard />
            </div>

            <div className="scroll-section transition-all duration-700 ease-in-out">
              <CompetitorTracker />
            </div>

            <div className="scroll-section transition-all duration-700 ease-in-out">
              <ContentAnalysis />
            </div>

            <div className="scroll-section transition-all duration-700 ease-in-out">
              <AdCampaigns />
            </div>

           

            <div className="scroll-section transition-all duration-700 ease-in-out">
              <ChatSection />
            </div>
            
           
           
            <div className="scroll-section transition-all duration-700 ease-in-out">
              <Reports />
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative">
            <CTA />
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;